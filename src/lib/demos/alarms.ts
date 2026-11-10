/**
 * Alarm hand-off for the Tallinja demo. Every controller sees the active
 * alarm; when one acknowledges it, it is handled once for everybody and the
 * next alarm waits in the queue, so no alarm is lost. Functions return new
 * state objects.
 */

export type AlarmKind = "fire" | "tech";
export type Controller = "A" | "B";

export interface Alarm {
  id: number;
  kind: AlarmKind;
  bus: number;
}

export interface AlarmState {
  queue: readonly Alarm[];
  active: Alarm | null;
  lastHandled: { alarm: Alarm; by: Controller } | null;
}

export const emptyAlarms: AlarmState = { queue: [], active: null, lastHandled: null };

/** New alarm: shown at once if nothing is active, else queued. */
export function raiseAlarm(state: AlarmState, alarm: Alarm): AlarmState {
  if (!state.active) return { ...state, active: alarm };
  return { ...state, queue: [...state.queue, alarm] };
}

/** A controller handles the active alarm. Does nothing when none is active. */
export function acknowledge(state: AlarmState, by: Controller): AlarmState {
  if (!state.active) return state;
  return { ...state, active: null, lastHandled: { alarm: state.active, by } };
}

/** Show the next queued alarm, if any and if none is active. */
export function nextAlarm(state: AlarmState): AlarmState {
  if (state.active || state.queue.length === 0) return state;
  const [next, ...rest] = state.queue;
  return { ...state, active: next, queue: rest };
}
