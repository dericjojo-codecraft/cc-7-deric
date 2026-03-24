import { describe, expect, it } from "vitest";
import { type Beat, type ApplicationState } from "./types.ts";
import { reducer } from './reducer.ts';

describe("Vitest for reducer", () => {
  const initialState: ApplicationState = {
    mode: "NORMAL",
    sessions: {
      beats: [],
    },
  };

  const stateIn = (mode: ApplicationState["mode"]): ApplicationState => ({
    ...initialState,
    mode,
  });

  // ── START_RECORDING ───────────────────────────────────────────────────────
  describe("START_RECORDING", () => {
    it("transitions NORMAL → RECORDING_PROGRESS", () => {
      const next = reducer(initialState, { type: "START_RECORDING", timestamp: 100 });
      expect(next.mode).toBe("RECORDING_PROGRESS");
    });

    it("is a no-op when already RECORDING_PROGRESS", () => {
      const state = stateIn("RECORDING_PROGRESS");
      const next = reducer(state, { type: "START_RECORDING", timestamp: 100 });
      expect(next.mode).toBe("RECORDING_PROGRESS");
    });

    it("is a no-op when RECORDING_PAUSED", () => {
      const state = stateIn("RECORDING_PAUSED");
      const next = reducer(state, { type: "START_RECORDING", timestamp: 100 });
      expect(next.mode).toBe("RECORDING_PAUSED");
    });

    it("does not mutate sessions", () => {
      const next = reducer(initialState, { type: "START_RECORDING", timestamp: 100 });
      expect(next.sessions).toEqual(initialState.sessions);
    });
  });

  // ── STOP_RECORDING ────────────────────────────────────────────────────────
  describe("STOP_RECORDING", () => {
    it("transitions RECORDING_PROGRESS → NORMAL", () => {
      const state = stateIn("RECORDING_PROGRESS");
      const next = reducer(state, { type: "STOP_RECORDING" });
      expect(next.mode).toBe("NORMAL");
    });

    it("is a no-op when NORMAL", () => {
      const next = reducer(initialState, { type: "STOP_RECORDING" });
      expect(next.mode).toBe("NORMAL");
    });

    it("is a no-op when RECORDING_PAUSED", () => {
      const state = stateIn("RECORDING_PAUSED");
      const next = reducer(state, { type: "STOP_RECORDING" });
      expect(next.mode).toBe("RECORDING_PAUSED");
    });
  });

  // ── PAUSE_RECORDING ───────────────────────────────────────────────────────
  describe("PAUSE_RECORDING", () => {
    it("transitions RECORDING_PROGRESS → RECORDING_PAUSED", () => {
      const state = stateIn("RECORDING_PROGRESS");

      const next = reducer(state, { type: "PAUSE_RECORDING", pause: {type: "PAUSE_START", timestamp: 200}});
      expect(next.mode).toBe("RECORDING_PAUSED");
    });

    it("is a no-op when NORMAL", () => {
      const next = reducer(initialState, { type: "PAUSE_RECORDING", pause: {type: "PAUSE_START", timestamp: 200}});
      expect(next.mode).toBe("NORMAL");
    });

    it("is a no-op when already RECORDING_PAUSED", () => {
      const state = stateIn("RECORDING_PAUSED");
      const next = reducer(state, { type: "PAUSE_RECORDING", pause: {type: "PAUSE_START", timestamp: 200}});
      expect(next.mode).toBe("RECORDING_PAUSED");
    });
  });

  // ── CONTINUE_RECORDING ────────────────────────────────────────────────────
  describe("CONTINUE_RECORDING", () => {
    it("transitions RECORDING_PAUSED → RECORDING_PROGRESS", () => {
      const state = stateIn("RECORDING_PAUSED");
      const next = reducer(state, { type: "CONTINUE_RECORDING", pause: {type: "PAUSE_START", timestamp: 200}});
      expect(next.mode).toBe("RECORDING_PROGRESS");
    });

    it("is a no-op when NORMAL", () => {
      const next = reducer(initialState, { type: "CONTINUE_RECORDING", pause: {type: "PAUSE_START", timestamp: 200}});
      expect(next.mode).toBe("NORMAL");
    });

    it("is a no-op when RECORDING_PROGRESS", () => {
      const state = stateIn("RECORDING_PROGRESS");
      const next = reducer(state, { type: "CONTINUE_RECORDING", pause: {type: "PAUSE_START", timestamp: 200}});
      expect(next.mode).toBe("RECORDING_PROGRESS");
    });
  });

  // ── START_PLAYBACK ────────────────────────────────────────────────────────
  describe("START_PLAYBACK", () => {
    it("transitions NORMAL → PLAYBACK_PROGRESS", () => {
      const next = reducer(initialState, { type: "START_PLAYBACK" });
      expect(next.mode).toBe("PLAYBACK_PROGRESS");
    });

    it("is a no-op when already PLAYBACK_PROGRESS", () => {
      const state = stateIn("PLAYBACK_PROGRESS");
      const next = reducer(state, { type: "START_PLAYBACK" });
      expect(next.mode).toBe("PLAYBACK_PROGRESS");
    });

    it("is a no-op when RECORDING_PROGRESS", () => {
      const state = stateIn("RECORDING_PROGRESS");
      const next = reducer(state, { type: "START_PLAYBACK" });
      expect(next.mode).toBe("RECORDING_PROGRESS");
    });
  });

  // ── STOP_PLAYBACK ─────────────────────────────────────────────────────────
  describe("STOP_PLAYBACK", () => {
    it("transitions PLAYBACK_PROGRESS → NORMAL", () => {
      const state = stateIn("PLAYBACK_PROGRESS");
      const next = reducer(state, { type: "STOP_PLAYBACK" });
      expect(next.mode).toBe("NORMAL");
    });

    it("is a no-op when NORMAL", () => {
      const next = reducer(initialState, { type: "STOP_PLAYBACK" });
      expect(next.mode).toBe("NORMAL");
    });

    it("is a no-op when PLAYBACK_PAUSED", () => {
      const state = stateIn("PLAYBACK_PAUSED");
      const next = reducer(state, { type: "STOP_PLAYBACK" });
      expect(next.mode).toBe("PLAYBACK_PAUSED");
    });
  });

  // ── PAUSE_PLAYBACK ────────────────────────────────────────────────────────
  describe("PAUSE_PLAYBACK", () => {
    it("transitions PLAYBACK_PROGRESS → PLAYBACK_PAUSED", () => {
      const state = stateIn("PLAYBACK_PROGRESS");
      const next = reducer(state, { type: "PAUSE_PLAYBACK" });
      expect(next.mode).toBe("PLAYBACK_PAUSED");
    });

    it("is a no-op when NORMAL", () => {
      const next = reducer(initialState, { type: "PAUSE_PLAYBACK" });
      expect(next.mode).toBe("NORMAL");
    });

    it("is a no-op when already PLAYBACK_PAUSED", () => {
      const state = stateIn("PLAYBACK_PAUSED");
      const next = reducer(state, { type: "PAUSE_PLAYBACK" });
      expect(next.mode).toBe("PLAYBACK_PAUSED");
    });
  });

  // ── CONTINUE_PLAYBACK ─────────────────────────────────────────────────────
  describe("CONTINUE_PLAYBACK", () => {
    it("transitions PLAYBACK_PAUSED → PLAYBACK_PROGRESS", () => {
      const state = stateIn("PLAYBACK_PAUSED");
      const next = reducer(state, { type: "CONTINUE_PLAYBACK" });
      expect(next.mode).toBe("PLAYBACK_PROGRESS");
    });

    it("is a no-op when NORMAL", () => {
      const next = reducer(initialState, { type: "CONTINUE_PLAYBACK" });
      expect(next.mode).toBe("NORMAL");
    });

    it("is a no-op when PLAYBACK_PROGRESS", () => {
      const state = stateIn("PLAYBACK_PROGRESS");
      const next = reducer(state, { type: "CONTINUE_PLAYBACK" });
      expect(next.mode).toBe("PLAYBACK_PROGRESS");
    });
  });

  // ── BEAT ──────────────────────────────────────────────────────────────────
  describe("BEAT", () => {
    const beat1:Beat = { type: "BEAT", key: "A", timestamp: 100 };
    const beat2:Beat = { type: "BEAT", key: "B", timestamp: 200 };

    it("appends beats when RECORDING_PROGRESS", () => {
      const state = stateIn("RECORDING_PROGRESS");
      const next = reducer(state, { type: "BEAT", data: beat1 });
      expect(next.sessions.beats).toEqual([beat1]);
    });

    it("accumulates beats across multiple BEAT actions", () => {
      const state = stateIn("RECORDING_PROGRESS");
      const after1 = reducer(state, { type: "BEAT", data: beat1 });
      const after2 = reducer(after1, { type: "BEAT", data: beat2 });
      expect(after2.sessions.beats).toEqual([beat1, beat2]);
    });

    it("does not append beats when NORMAL", () => {
      const next = reducer(initialState, { type: "BEAT", data: beat1 });
      expect(next.sessions.beats).toEqual([]);
    });

    it("does not append beats when RECORDING_PAUSED", () => {
      const state = stateIn("RECORDING_PAUSED");
      const next = reducer(state, { type: "BEAT", data: beat1 });
      expect(next.sessions.beats).toEqual([]);
    });

    it("does not append beats when PLAYBACK_PROGRESS", () => {
      const state = stateIn("PLAYBACK_PROGRESS");
      const next = reducer(state, { type: "BEAT", data: beat1 });
      expect(next.sessions.beats).toEqual([]);
    });

    it("does not mutate the previous state's beats array", () => {
      const state = stateIn("RECORDING_PROGRESS");
      const before = state.sessions.beats;
      reducer(state, { type: "BEAT", data: beat1 });
      expect(before).toEqual([]);
    });

    it("preserves mode when appending beats", () => {
      const state = stateIn("RECORDING_PROGRESS");
      const next = reducer(state, { type: "BEAT", data: beat1 });
      expect(next.mode).toBe("RECORDING_PROGRESS");
    });
  });

  // ── State immutability ────────────────────────────────────────────────────
  describe("immutability", () => {
    it("returns a new object reference on valid transition", () => {
      const next = reducer(initialState, { type: "START_RECORDING", timestamp: 0 });
      expect(next).not.toBe(initialState);
    });

    it("returns the same object reference when action is a no-op", () => {
      const state = stateIn("RECORDING_PAUSED");
      const next = reducer(state, { type: "START_RECORDING", timestamp: 0 });
      expect(next).toBe(state);
    });
  });
});