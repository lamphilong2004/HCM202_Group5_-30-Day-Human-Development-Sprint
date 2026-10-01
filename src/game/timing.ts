/** Seconds each team has to answer one question. */
export const QUESTION_SECONDS = 30

export const QUESTION_MS = QUESTION_SECONDS * 1000

/** Whole seconds left, rounded up so the display reads 00:30 … 00:01, then 00:00 exactly at the deadline. */
export const secondsLeft = (remainingMs: number) => Math.max(0, Math.ceil(remainingMs / 1000))

export const formatClock = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
