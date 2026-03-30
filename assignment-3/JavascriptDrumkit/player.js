class Player {
    session;
    engine;
    listeners = [];
    scheduledPlaybackTimers = [];
    beatIndex = 0;

    constructor(session, playbackEngine) {
        this.session = session;
        this.engine = playbackEngine;
    }

    get totalBeats() {
        return this.session.beats.filter(b => b.type === "BEAT").length;
    }

    subscribe(listener) { this.listeners.push(listener); }
    notify(currentIndex, total) { this.listeners.forEach(obs => obs(currentIndex, total)); }

    normalize(session, startIndex = 0) {
        this.scheduledPlaybackTimers.forEach(id => clearTimeout(id));
        this.scheduledPlaybackTimers = [];

        let accumulatedPauseTime = 0;
        let pauseStartTime = 0;
        let playbackBeatCount = 0;
        const firstTimestamp = session.beats[0]?.timestamp || 0;

        for (let i = 0; i < session.beats.length; i++) {
            const current = session.beats[i];

            if (current.type === "PAUSE_START") {
                pauseStartTime = current.timestamp;
                continue;
            }

            if (current.type === "PAUSE_STOP") {
                if (pauseStartTime > 0) {
                    accumulatedPauseTime += (current.timestamp - pauseStartTime);
                }
                continue;
            }

            if (current.type === "BEAT") {
                const currentCount = ++playbackBeatCount;

                if (i < startIndex) continue;

                // Normalization: Current time - Start time - Total time spent paused
                const adjustedDelay = current.timestamp - firstTimestamp - accumulatedPauseTime;
                
                const timer = setTimeout(() => {
                    this.beatIndex = i + 1;
                    this.engine(current);
                    this.notify(currentCount, this.totalBeats);
                }, Math.max(0, adjustedDelay));
                
                this.scheduledPlaybackTimers.push(timer);
            }
        }
    }

    playTimeline() {
        if (!this.session?.beats?.length) return;
        this.normalize(this.session, this.beatIndex);
    }

    pauseTimeline() {
        this.scheduledPlaybackTimers.forEach(id => clearTimeout(id));
        this.scheduledPlaybackTimers = [];
    }

    resetTimeline() {
        this.pauseTimeline();
        this.beatIndex = 0;
        this.notify(0, this.totalBeats);
    }
}

export { Player };