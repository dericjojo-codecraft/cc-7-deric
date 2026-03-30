const reducer = (state, action) => {
    let newState = state;
    switch (action.type) {
        case "START_RECORDING": {
            if (newState.mode === "FREEPLAY")
                newState = { ...state, mode: "RECORDING_PROGRESS" };
            break;
        }
        case "STOP_RECORDING": {
            if (newState.mode === "RECORDING_PROGRESS" || newState.mode === "RECORDING_PAUSED")
                newState = { ...state, mode: "FREEPLAY" };
            break;
        }
        case "PAUSE_RECORDING": {
            if (newState.mode === "RECORDING_PROGRESS")
                newState = { ...state, mode: "RECORDING_PAUSED" };
            break;
        }
        case "CONTINUE_RECORDING": {
            if (newState.mode === "RECORDING_PAUSED")
                newState = { ...state, mode: "RECORDING_PROGRESS" };
            break;
        }
        case "START_PLAYBACK": {
            if (newState.mode === "FREEPLAY")
                newState = { ...state, mode: "PLAYBACK_PROGRESS" };
            break;
        }
        case "RESTART_PLAYBACK": {
            if (newState.mode === "PLAYBACK_PROGRESS" || newState.mode === "PLAYBACK_PAUSED")
                newState = { ...state, mode: "FREEPLAY" };
            break;
        }
        case "STOP_PLAYBACK": {
            newState = { ...state, mode: "FREEPLAY" };
            break;
        }
        case "PAUSE_PLAYBACK": {
            if (newState.mode === "PLAYBACK_PROGRESS")
                newState = { ...state, mode: "PLAYBACK_PAUSED" };
            break;
        }
        case "CONTINUE_PLAYBACK": {
            if (newState.mode === "PLAYBACK_PAUSED")
                newState = { ...state, mode: "PLAYBACK_PROGRESS" };
            break;
        }
        case "BEAT": {
            if (newState.mode === "RECORDING_PROGRESS")
                newState = {
                    ...state, sessions: {
                        ...state.sessions, beats: [
                            ...state.sessions.beats,
                            action.data
                        ]
                    }
                };
            break;
        }
        default:
            return state;
    }
    return newState;
};
export { reducer };