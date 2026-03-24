import { ApplicationState, Action, Session, Pause, Beat } from "./types";

const reducer = (state: ApplicationState, action: Action) => {
  let newState: ApplicationState = state;
  
  switch(action.type) {
    case "START_RECORDING": {
      if(newState.mode === "NORMAL") newState = {...state, mode: "RECORDING_PROGRESS"}
      break;
    }
    case "STOP_RECORDING": {
      if(newState.mode === "RECORDING_PROGRESS") newState = {...state, mode: "NORMAL" };
      break;
    }
    case "PAUSE_RECORDING": {
      if(newState.mode === "RECORDING_PROGRESS") newState = {...state, mode: "RECORDING_PAUSED" };
      break;
    }
    case "CONTINUE_RECORDING": {
      if(newState.mode === "RECORDING_PAUSED") newState = {...state, mode: "RECORDING_PROGRESS"};
      break
    }
    case "START_PLAYBACK": {
      if(newState.mode === "NORMAL") newState = {...state, mode: "PLAYBACK_PROGRESS" };
      break;
    }
    case "STOP_PLAYBACK": {
      if(newState.mode === "PLAYBACK_PROGRESS") newState = {...state, mode: "NORMAL" };
      break;
    }
    case "PAUSE_PLAYBACK": {
      if(newState.mode === "PLAYBACK_PROGRESS") newState = {...state, mode: "PLAYBACK_PAUSED" };
      break;
    }
    case "CONTINUE_PLAYBACK": {
      if(newState.mode === "PLAYBACK_PAUSED") newState = {...state, mode: "PLAYBACK_PROGRESS" };
      break;
    }
    case "BEAT": {
      if(newState.mode === "RECORDING_PROGRESS") newState = {
        ...state, sessions: {
          ...state.sessions, beats: [
            ...state.sessions.beats, 
            action.data
          ]
        }
      }
      break;
    }
  }
  return newState;
}

export { reducer, type ApplicationState, type Pause, type Beat, type Session }