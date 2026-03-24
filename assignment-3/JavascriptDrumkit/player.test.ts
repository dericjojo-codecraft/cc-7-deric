import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Player } from './player';
import { Session, Beat, Pause } from './reducer';

describe('Player', () => {
    let mockSession: Session;
    let mockPlaybackEngine: (beat: Beat | Pause) => void;
    let player: Player;

    beforeEach(() => {
        vi.useFakeTimers();
        mockPlaybackEngine = vi.fn();
        mockSession = {
            beats: [
                { type: "BEAT", key: "A", timestamp: 1000 },
                { type: "PAUSE_START", timestamp: 5000 },
                { type: "PAUSE_STOP", timestamp: 10000 },
                { type: "BEAT", key: "B", timestamp: 11000 },
            ]
        };
        player = new Player(mockSession, mockPlaybackEngine);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // --- Playback ---

    describe('playTimeline', () => {
        it('fires the first beat at its timestamp', () => {
            player.playTimeline();
            vi.advanceTimersByTime(999);
            expect(mockPlaybackEngine).not.toHaveBeenCalled();
            vi.advanceTimersByTime(1);
            expect(mockPlaybackEngine).toHaveBeenCalledWith(mockSession.beats[0]);
        });

        it('skips pause durations when scheduling beats', () => {
            player.playTimeline();
            vi.advanceTimersByTime(1000); // A fires
            vi.advanceTimersByTime(4999);
            expect(mockPlaybackEngine).toHaveBeenCalledTimes(1);
            vi.advanceTimersByTime(1);
            expect(mockPlaybackEngine).toHaveBeenCalledTimes(2);
            expect(mockPlaybackEngine).toHaveBeenLastCalledWith(mockSession.beats[3]);
        });

        it('resets and replays from the beginning when called after reset', () => {
            player.playTimeline();
            vi.advanceTimersByTime(1000); // A fires
            player.resetTimeline();
            player.playTimeline();
            vi.advanceTimersByTime(1000); // A fires again
            expect(mockPlaybackEngine).toHaveBeenCalledTimes(2);
        });

        it('works correctly with a single-beat session', () => {
            const shortSession: Session = { beats: [{ type: "BEAT", key: "X", timestamp: 500 }] };
            const shortPlayer = new Player(shortSession, mockPlaybackEngine);
            shortPlayer.playTimeline();
            vi.advanceTimersByTime(500);
            expect(mockPlaybackEngine).toHaveBeenCalledWith(shortSession.beats[0]);
        });
    });

    // --- Pause & Resume ---

    describe('pauseTimeline', () => {
        it('clears all scheduled timers', () => {
            player.playTimeline();
            player.pauseTimeline();
            vi.advanceTimersByTime(20000);
            expect(mockPlaybackEngine).not.toHaveBeenCalled();
            expect(player.scheduledPlaybackTimers.length).toBe(0);
        });

        it('resumes from the correct beat after pausing', async () => {
            player.playTimeline();
            
            vi.advanceTimersByTime(1001); 
            player.pauseTimeline();
            
            expect(mockPlaybackEngine).toHaveBeenCalledTimes(1);
            expect(player['beatIndex']).toBe(1); // It should now be at the next item

            player.playTimeline();
            vi.advanceTimersByTime(5000); 
            
            expect(mockPlaybackEngine).toHaveBeenCalledTimes(2);
            expect(mockPlaybackEngine).toHaveBeenLastCalledWith(mockSession.beats[3]);
        });

        it('advances beatIndex past non-beat items (pauses)', () => {
            player.playTimeline();
            vi.advanceTimersByTime(5000);
            player.pauseTimeline();
            expect(player['beatIndex']).toBeGreaterThan(0);
        });
    });

    // --- Reset ---

    describe('resetTimeline', () => {
        it('resets beatIndex and restores totalBeats count', () => {
            player.playTimeline();
            vi.advanceTimersByTime(1000);
            player.resetTimeline();
            expect(player.totalBeats).toBe(3);
        });
    });

    // --- Observers ---

    describe('subscribe / unsubscribe', () => {
        it('notifies subscriber on play and on each beat', () => {
            const listener = vi.fn();
            player.subscribe(listener);
            player.playTimeline();
            expect(listener).toHaveBeenCalledTimes(1);
            vi.advanceTimersByTime(1000);
            expect(listener).toHaveBeenCalledTimes(2);
        });

        it('does not notify after unsubscribing', () => {
            const listener = vi.fn();
            player.subscribe(listener);
            player.unsubscribe(listener);
            player.playTimeline();
            expect(listener).not.toHaveBeenCalled();
        });
    });
});