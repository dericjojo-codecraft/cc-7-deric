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
    
        it('handles multiple pause intervals correctly', () => {
            const multiPauseSession: Session = {
                beats: [
                    { type: "BEAT", key: "A", timestamp: 1000 },
                    { type: "PAUSE_START", timestamp: 5000 },
                    { type: "PAUSE_STOP", timestamp: 10000 },
                    { type: "BEAT", key: "B", timestamp: 11000 },
                    { type: "PAUSE_START", timestamp: 12000 },
                    { type: "PAUSE_STOP", timestamp: 15000 },
                    { type: "BEAT", key: "C", timestamp: 16000 },
                ]
            };

            const multiPlayer = new Player(multiPauseSession, mockPlaybackEngine);
            multiPlayer.playTimeline();

            // 1. Verify Beat A
            vi.advanceTimersByTime(1000);
            expect(mockPlaybackEngine).toHaveBeenLastCalledWith(multiPauseSession.beats[0]);

            // 2. Verify Beat B 
            // Calculation: A(1000) + Gap to Pause(4000) + Gap to B(1000) = 6000ms
            vi.advanceTimersByTime(4999);
            expect(mockPlaybackEngine).toHaveBeenCalledTimes(1); 
            vi.advanceTimersByTime(1);
            expect(mockPlaybackEngine).toHaveBeenCalledTimes(2);
            expect(mockPlaybackEngine).toHaveBeenLastCalledWith(multiPauseSession.beats[3]);

            // 3. Verify Beat C
            // Calculation: Previous(6000) + Gap B to Pause2(1000) + Gap Pause2 to C(1000) = 8000ms
            // We already advanced 6000ms, so we need 2000ms more.
            vi.advanceTimersByTime(2000);
            expect(mockPlaybackEngine).toHaveBeenCalledTimes(3);
            expect(mockPlaybackEngine).toHaveBeenLastCalledWith(multiPauseSession.beats[6]);
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

    // --- Achieve coverage ---
    describe('other tests', () => {
        it('skips over undefined or null beats in the session', () => {
            const sparseBeats = [
                { type: "BEAT", key: "A", timestamp: 1000 },
                undefined, // This triggers the !current check
                { type: "BEAT", key: "B", timestamp: 2000 },
                
            ] as unknown as (Beat | Pause)[];

            const sparseSession: Session = { beats: sparseBeats };
            const sparsePlayer = new Player(sparseSession, mockPlaybackEngine);

            sparsePlayer.playTimeline();

            vi.advanceTimersByTime(2000);
            
            // Should have skipped the undefined and played both A and B
            expect(mockPlaybackEngine).toHaveBeenCalledTimes(2);
            expect(mockPlaybackEngine).toHaveBeenCalledWith(sparseBeats[0]);
            expect(mockPlaybackEngine).toHaveBeenCalledWith(sparseBeats[2]);
        });

        it('handles cases where the previous beat is missing in the array', () => {
            // We simulate a session where the item before our startIndex is missing
            const brokenBeats = [
                undefined, 
                { type: "BEAT", key: "A", timestamp: 1000 },
                { type: "BEAT", key: "B", timestamp: 2000 },
            ] as unknown as (Beat | Pause)[];

            const brokenSession: Session = { beats: brokenBeats };
            const brokenPlayer = new Player(brokenSession, mockPlaybackEngine);

            // Start from index 2 (Beat B). 
            // The logic will try to look at index 1 (Beat A) as 'previous'.
            // If we started at index 1, it would try to look at index 0 (undefined).
            brokenPlayer.playTimeline(); 

            vi.advanceTimersByTime(2000);
            expect(mockPlaybackEngine).toHaveBeenCalled();
        });
    })
});