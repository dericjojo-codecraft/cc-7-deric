import { Player } from './player.js';
import { reducer } from './reducer.js';

const beatKeyArr = [65, 83, 68, 70, 71, 72, 74, 75, 76];

const KEY_MAP = {
    81: 'RESTART_PLAYBACK',
    87: 'START_PLAYBACK',
    69: 'TOGGLE_PLAYBACK',
    85: 'RESET_SESSION',
    73: 'STOP_RECORDING',
    79: 'START_RECORDING',
    80: 'TOGGLE_RECORDING'
};

let activePlayer = null;
let startTime = null;

const keys = document.querySelectorAll('.key');
const controlBtns = document.querySelectorAll('.control-btn');
const beatsListUl = document.getElementById('beats-list');
const progressBar = document.getElementById('progress-bar');
const stateStr = document.getElementById("state-str");
const beatCounter = document.getElementById("beat-counter");

const pauseKbd = document.querySelector('#pause-playback kbd');
const recPauseKbd = document.querySelector('#pause-recording kbd');

let state = {
    mode: "FREEPLAY",
    sessions: {
        beats: []
    }
};

function dispatch(action) {
    state = reducer(state, action);
    stateStr.textContent = "STUDIO STATE: " + state.mode;
    updateButtonVisuals();
}

function updateButtonVisuals() {
    const allBtns = {
        startPlayback: document.getElementById('start-playback'),
        stopPlayback: document.getElementById('stop-playback'),
        pausePlayback: document.getElementById('pause-playback'),
        startRecord: document.getElementById('resume-recording'),
        stopRecord: document.getElementById('stop-recording'),
        pauseRecord: document.getElementById('pause-recording'),
        resetRecord: document.getElementById('reset-recording')
    };

    const hasBeats = state.sessions.beats.some(beat => beat.type === "BEAT");

    Object.values(allBtns).forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('disabled');
    });

    switch (state.mode) {
        case "FREEPLAY":
            if (!hasBeats) {
                allBtns.startPlayback.disabled = true;
                allBtns.startPlayback.classList.add('disabled');
            }
            allBtns.stopPlayback.disabled = true;
            allBtns.stopPlayback.classList.add('disabled');
            allBtns.pausePlayback.disabled = true;
            allBtns.pausePlayback.classList.add('disabled');
            
            allBtns.stopRecord.disabled = true;
            allBtns.stopRecord.classList.add('disabled');
            allBtns.pauseRecord.disabled = true;
            allBtns.pauseRecord.classList.add('disabled');
            break;

        case "PLAYBACK_PROGRESS":
        case "PLAYBACK_PAUSED":
            allBtns.startPlayback.disabled = true;
            allBtns.startPlayback.classList.add('disabled');
            allBtns.startRecord.disabled = true;
            allBtns.startRecord.classList.add('disabled');
            allBtns.stopRecord.disabled = true;
            allBtns.stopRecord.classList.add('disabled');
            allBtns.pauseRecord.disabled = true;
            allBtns.pauseRecord.classList.add('disabled');
            allBtns.resetRecord.disabled = true;
            allBtns.resetRecord.classList.add('disabled');
            break;

        case "RECORDING_PROGRESS":
        case "RECORDING_PAUSED":
            allBtns.startRecord.disabled = true;
            allBtns.startRecord.classList.add('disabled');
            allBtns.startPlayback.disabled = true;
            allBtns.startPlayback.classList.add('disabled');
            allBtns.stopPlayback.disabled = true;
            allBtns.stopPlayback.classList.add('disabled');
            allBtns.pausePlayback.disabled = true;
            allBtns.pausePlayback.classList.add('disabled');
            break;
    }
}

function handleControl(actionName) {
    const targetBtn = document.querySelector(`[data-action="${actionName}"]`);
    if (targetBtn && targetBtn.disabled) return;

    switch (actionName) {
        case 'RESTART_PLAYBACK':
            if (activePlayer) {
                activePlayer.resetTimeline();
                document.querySelectorAll(".bar-segment").forEach(s => s.classList.remove('active'));
                dispatch({ type: "RESTART_PLAYBACK" });
                pauseKbd.textContent = "Pause";
            }
            break;
        case 'START_PLAYBACK':
            if (state.mode === "PLAYBACK_PROGRESS" || state.mode === "PLAYBACK_PAUSED") return; 
            handlePlayback();
            pauseKbd.textContent = "Pause";
            break;
        case 'TOGGLE_PLAYBACK':
            if (state.mode === "PLAYBACK_PROGRESS" && activePlayer) {
                activePlayer.pauseTimeline();
                dispatch({ type: "PAUSE_PLAYBACK" });
                pauseKbd.textContent = "Resume";
            } else if (state.mode === "PLAYBACK_PAUSED" && activePlayer) {
                dispatch({ type: "CONTINUE_PLAYBACK" });
                activePlayer.playTimeline();
                pauseKbd.textContent = "Pause";
            } else if (state.mode === "FREEPLAY") {
                handlePlayback();
                pauseKbd.textContent = "Pause";
            }
            break;
        case 'RESET_SESSION':
            if (state.mode === "RECORDING_PROGRESS" || state.mode === "RECORDING_PAUSED") {
                dispatch({ type: "STOP_RECORDING" });
            }
            state.sessions.beats = [];
            startTime = null;
            beatsListUl.innerHTML = "";
            progressBar.innerHTML = "";
            beatCounter.textContent = "";
            break;
        case 'STOP_RECORDING':
            if (state.mode === "RECORDING_PROGRESS" || state.mode === "RECORDING_PAUSED") {
                dispatch({ type: "STOP_RECORDING" });
                progressBar.style.opacity = "0.7";
            }
            break;
        case 'START_RECORDING':
            if (state.mode === "FREEPLAY") {
                dispatch({ type: "START_RECORDING" });
            }
            break;
        case 'TOGGLE_RECORDING':
            if (state.mode === "RECORDING_PROGRESS") {
                dispatch({ type: "PAUSE_RECORDING" });
                state.sessions.beats.push({ 
                    type: "PAUSE_START", 
                    timestamp: Date.now() - startTime 
                });
                recPauseKbd.textContent = "Resume";
            } else if (state.mode === "RECORDING_PAUSED") {
                dispatch({ type: "CONTINUE_RECORDING" });
                state.sessions.beats.push({ 
                    type: "PAUSE_STOP", 
                    timestamp: Date.now() - startTime 
                });
                recPauseKbd.textContent = "Pause";
            }
            break;
    }
}

window.addEventListener('keydown', (event) => {
    const keyCode = event.keyCode;
    if (beatKeyArr.includes(keyCode) && !event.ctrlKey) {
        const keyElement = document.querySelector(`.key[data-key="${keyCode}"]`);
        if (keyElement) playKey(keyElement);
        return;
    }
    const isControlKey = event.ctrlKey || event.metaKey;
    if (isControlKey && KEY_MAP[keyCode]) {
        event.preventDefault();
        handleControl(KEY_MAP[keyCode]);
    }
});

controlBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        if (action) handleControl(action);
    });
});

function playKey(element) {
    const soundName = element.querySelector('kbd').textContent;
    playAudio(soundName);
    element.classList.add('playing');
    setTimeout(() => element.classList.remove('playing'), 70);
    if (state.mode === "RECORDING_PROGRESS") {
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
        activePlayer.subscribe((currentIndex, total) => {
            const segments = progressBar.querySelectorAll(".bar-segment");
            segments.forEach(s => s.classList.remove('active'));
            if (currentIndex > 0 && segments[currentIndex - 1]) {
                segments[currentIndex - 1].classList.add('active');
            }
            beatCounter.textContent = `Beat Count: ${currentIndex} / ${total}`
            if (currentIndex === total && total > 0) {
                setTimeout(() => {
                    dispatch({ type: "STOP_PLAYBACK" });
                    activePlayer = null;
                    updateButtonVisuals();
                }, 500);
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

updateButtonVisuals();
//window.alert("Enable FULLSCREEN(F11) mode for intended experience");

//const keysContainer = document.querySelector('.keys'); 
const createBtn = document.getElementById("create-btn");

function createButton() {
    const customPad = document.createElement("button");
    customPad.classList.add("key");
    customPad.setAttributes("data-key", "00");
    customPad.innerHTML = `
        <kbd>new</kbd>
        <span class="sound">custom</span>
    `
    keys.appendChild(customPad);
    customPad.addEventListener('click', (e) => {
        if (state.mode === "RECORDING_PROGRESS") playKey(e.currentTarget);
    });
}

createBtn.addEventListener('click', createButton);
