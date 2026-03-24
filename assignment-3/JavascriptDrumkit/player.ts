import { type Beat, type Session, type Pause } from './types.ts';

type Listener = (
    beatIndex: number,
    totalBeats: number
) => void;

type TimeOut = ReturnType<typeof setTimeout>;

class Player {
    private session: Session;
    private engine:(beat: Beat | Pause) => void;

    constructor(session: Session, playbackEngine:(beat: Beat | Pause) => void) {
        this.session = session;
        this.engine = playbackEngine;
    }

    listeners: Listener[] = [];
    
    // to hold timeout amounts
    scheduledPlaybackTimers: TimeOut[] = [];

    // use to navigate the session array
    private beatIndex:number = 0;
    get totalBeats() {
        return this.session.beats.length - 1;
    }

    subscribe(listener: Listener) { this.listeners.push(listener) }

    unsubscribe(listener: Listener) { this.listeners = this.listeners.filter(obs => obs !== listener) }

    notify() { this.listeners.forEach(obs => obs(this.beatIndex, this.totalBeats))}

    /**
     * the normalize function adjusts timeouts between the beats by removing pauses.
     * @param session is an array containing the beats and pauses of the session
     */
    private normalize(session: Session, startIndex: number = 0) {
        let currentDelay = 0;
        
        // empty the arr before normalising
        this.scheduledPlaybackTimers = [];

        for (let i = startIndex; i < session.beats.length; i++) {
            const current = session.beats[i];

            if(!current) continue;

            if (i === startIndex) {
                // first beat plays at its own time
                currentDelay = i === 0 ? current.timestamp : 0;
            } else {
                const previous = session.beats[i - 1];
                if (!previous) {} else {
                    // 1. calculate the gap from the previous beat
                    const gap = current.timestamp - previous.timestamp;

                    // 2. if the PREVIOUS item was a PAUSE_START, and THIS is a PAUSE_STOP,
                    if (previous.type === "PAUSE_START" && current.type === "PAUSE_STOP") { continue };

                    // 3. else add the gap to our running timer
                    currentDelay += gap;
                }
            }

            // 4. add to schedule if it's a BEAT type
            if (current.type === "BEAT") {
                const timer = setTimeout(() => {
                    this.beatIndex = i+1;
                    this.engine(current);
                    this.notify();
                }, currentDelay);
                
                this.scheduledPlaybackTimers.push(timer);
            } else {
                // move the index forward when pause
                const timer = setTimeout(() => {
                    this.beatIndex = i+1;
                }, currentDelay);
                this.scheduledPlaybackTimers.push(timer);
            }
        }
    }

    /**
     * the play function normalizes the session and notifies the listeners
     */
    playTimeline() {
        this.normalize(this.session, this.beatIndex);
        // 2. create timers from current beat index to final beat index
        /// call `playback` to play the beat
        this.notify();
    }

    /**
     * the pause function clears all the timeouts and notifies the listeners
     */
    pauseTimeline() {
        // clear all the timers in scheduledPlaybackTimers
        this.scheduledPlaybackTimers.forEach(id => clearTimeout(id));
        this.scheduledPlaybackTimers = [];
        this.notify();
    }

    resetTimeline() {
        this.pauseTimeline();
        this.beatIndex = 0;
        this.notify();
    }
}

export { Player };