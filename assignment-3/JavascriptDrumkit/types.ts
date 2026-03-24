interface Beat {
  type: string;
  key: string;
  timestamp: number;
}

interface Session {
  beats: (Beat | Pause)[];
}

type Action =
  | { type: "START_RECORDING"; timestamp: number }
  | { type: "STOP_RECORDING" }
  | { type: "PAUSE_RECORDING"; pause: Pause }
  | { type: "CONTINUE_RECORDING"; pause: Pause }
  | { type: "START_PLAYBACK" }
  | { type: "STOP_PLAYBACK" }
  | { type: "PAUSE_PLAYBACK" }
  | { type: "CONTINUE_PLAYBACK" }
  | { type: "BEAT"; data: Beat };

interface ApplicationState {
  mode:
    | "NORMAL"
    | "RECORDING_PROGRESS"
    | "RECORDING_PAUSED"
    | "PLAYBACK_PROGRESS"
    | "PLAYBACK_PAUSED";
  sessions: Session;
}

type Pause = {
  type: "PAUSE_START" | "PAUSE_STOP";
  timestamp: number;
}

export type { Beat, ApplicationState, Pause, Action, Session }