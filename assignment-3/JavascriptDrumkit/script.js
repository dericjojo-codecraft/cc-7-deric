import { Player } from './player.js';
import { reducer } from './reducer.js';

const beatKeyArr = [65, 83, 68, 70, 71, 72, 74, 75, 76];
const controlKeyArr = [81, 87, 69, 85, 73, 79, 80];

let activePlayer = null;
let startTime = null;

const keys = document.querySelectorAll('.key');
const beatsListUl = document.getElementById('beats-list');
const progressBar = document.getElementById('progress-bar');
const stateStr = document.getElementById("state-str");
const beatCounter = document.getElementById("beat-counter")

let state = {
    mode: "FREEPLAY",
    sessions: {
        beats: []
    }
};

function dispatch(action) {
    state = reducer(state, action);
    stateStr.textContent = "STUDIO STATE: " + state.mode;
}

window.addEventListener('keydown', (event) => {
    const keyCode = event.keyCode;
    if (beatKeyArr.includes(keyCode)) {
        const keyElement = document.querySelector(`.key[data-key="${keyCode}"]`);
        if (!keyElement) return;
        playKey(keyElement);
    } else if (controlKeyArr.includes(keyCode)) {
        switch (keyCode) {
            case 81: { // Q - Restart Playback
                if (activePlayer) {
                    activePlayer.resetTimeline();
                    const segments = progressBar.querySelectorAll(".bar-segment");
                    segments.forEach(s => s.classList.remove('active'));
                    dispatch({ type: "RESTART_PLAYBACK" });
                }
                break;
            }
            case 87: { // W - Start Playback
                handlePlayback();
                break;
            }
            case 69: { // E - Toggle Playback 
                if (state.mode === "PLAYBACK_PROGRESS" && activePlayer) {
                    activePlayer.pauseTimeline();
                    dispatch({ type: "PAUSE_PLAYBACK" });
                } else if (state.mode === "PLAYBACK_PAUSED" && activePlayer) {
                    dispatch({ type: "CONTINUE_PLAYBACK" });
                    activePlayer.playTimeline();
                }
                break;
            }
            case 85: { // U - Reset Session
                if (state.mode === "RECORDING_PROGRESS" || state.mode === "RECORDING_PAUSED") {
                    dispatch({ type: "STOP_RECORDING" });
                }
                state.sessions.beats = [];
                startTime = null;
                beatsListUl.innerHTML = "";
                progressBar.innerHTML = "";
                beatCounter.textContent = "";
                break;
            }
            case 73: { // I - Stop Recording
                if (state.mode === "RECORDING_PROGRESS" || state.mode === "RECORDING_PAUSED") {
                    dispatch({ type: "STOP_RECORDING" });
                    progressBar.style.opacity = "0.7";
                }
                break;
            }
            case 79: { // O - Start Recording
                if (state.mode === "FREEPLAY") {
                    dispatch({ type: "START_RECORDING" });
                }
                break;
            }
            case 80: { // P - Toggle Recording Pause
                if (state.mode === "RECORDING_PROGRESS") {
                    dispatch({ type: "PAUSE_RECORDING" });
                } else if (state.mode === "RECORDING_PAUSED") {
                    dispatch({ type: "CONTINUE_RECORDING" });
                }
                break;
            }
        }
    }
});

function playKey(element) {
    const soundName = element.querySelector('.sound').textContent;

    playAudio(soundName);

    element.classList.add('playing');
    setTimeout(() => element.classList.remove('playing'), 70);

    if(state.mode === "RECORDING_PROGRESS") {
        if (startTime === null) startTime = Date.now();
        const relative_time = Date.now() - startTime;
    
        state.sessions.beats.push({
            type: "BEAT",
            key: soundName,
            timestamp: relative_time
        });
        
        const li = document.createElement('li');
        li.textContent = `${soundName}`;
        beatsListUl.appendChild(li);

        const segment = document.createElement('div');
        segment.className = 'bar-segment';
        progressBar.appendChild(segment);
    }
}

function playAudio(soundName) {
    const sound = new Audio(`sounds/${soundName}.wav`);
    sound.currentTime = 0;
    sound.play().catch(() => {});
}

function playback(beat) {
    if ("key" in beat) playAudio(beat.key);
}

function handlePlayback() {
    if (state.mode !== "FREEPLAY") return;
    if (state.sessions.beats.length > 0) {
        activePlayer = new Player(state.sessions, playback);
        dispatch({ type: "START_PLAYBACK" });

        // subscription to control the current beat colour
        activePlayer.subscribe((currentIndex, total) => {
            const segments = progressBar.querySelectorAll(".bar-segment");
            segments.forEach(s => s.classList.remove('active'));
            const targetSegment = segments[currentIndex - 1];
            if (targetSegment) targetSegment.classList.add('active');
            beatCounter.textContent = `Beat Count: ${currentIndex} / ${total+1}`

            if (currentIndex === state.sessions.beats.length) {
                setTimeout(() => {
                    if (targetSegment) targetSegment.classList.remove('active');
                    dispatch({ type: "STOP_PLAYBACK" });
                    activePlayer = null;
                }, 1000);
            }
        });
        activePlayer.playTimeline();
    }
}

keys.forEach(key => {
    key.addEventListener('click', (e) => {
        if (state.mode === "RECORDING_PROGRESS") playKey(e.currentTarget);
    });
});