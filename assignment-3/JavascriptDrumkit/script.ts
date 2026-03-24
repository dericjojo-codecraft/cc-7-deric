interface Beat {
  key: string;
  timestamp: number;
}

interface Recording {
  beats: Beat[];
}

type Action =
  | { type: "START_RECORDING"; timestamp: number }
  | { type: "STOP_RECORDING" }
  | { type: "PAUSE_RECORDING"; timestamp: number }
  | { type: "CONTINUE_RECORDING"; timestamp: number }
  | { type: "START_PLAYBACK" }
  | { type: "STOP_PLAYBACK" }
  | { type: "PAUSE_PLAYBACK" }
  | { type: "CONTINUE_PLAYBACK" }
  | { type: "BEAT"; data: Beat[] };

interface ApplicationState {
  mode:
    | "NORMAL"
    | "RECORDING_PROGRESS"
    | "RECORDING_PAUSED"
    | "PLAYBACK_PROGRESS"
    | "PLAYBACK_PAUSED";
  recordings: Recording;
}

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
        ...state, recordings: {
          ...state.recordings, beats: [
            ...state.recordings.beats, 
            ...action.data
          ]
        }
      }
      break;
    }
  }
  return newState;
}

export { reducer, type ApplicationState }