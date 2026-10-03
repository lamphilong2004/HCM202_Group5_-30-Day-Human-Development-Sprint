export type Team = 'A' | 'B'

export type OptionId = 'A' | 'B' | 'C' | 'D'

/** The learning objective's original form in the approved bank (kept for traceability). */
export type QuestionKind = 'THEORY' | 'APPLICATION'

/** Suitability rubric: every question has exactly one option at each level. */
export type Level = 'BEST' | 'GOOD' | 'PARTIAL' | 'UNSUITABLE'

export type Option = {
  id: OptionId
  text: string
  level: Level
  /** Why this option earns its points — shown when a team picks it. */
  explanation: string
}

export type Question = {
  /** e.g. "A01" = Team A, question 01. */
  id: string
  team: Team
  /** 1–10, the question's number within its team. */
  number: number
  day: number
  kind: QuestionKind
  /** HCM202 learning objective carried over from the approved question bank. */
  objective: string
  question: string
  options: [Option, Option, Option, Option]
  /** “Vì sao?” — the theory behind the rubric. */
  explanation: string
  theory: string[]
}

export type DayInfo = {
  day: number
  theme: string
  /** Short name used in the final journey recap. */
  journey: string
  multiplier: number
}

export type Screen = 'START' | 'QUESTION' | 'FEEDBACK' | 'DAY_COMPLETE' | 'FINAL_RESULT' | 'REFLECTION'

export type Scores = Record<Team, number>

export type Outcome = Level | 'TIMEOUT'

export type AnswerRecord = {
  questionId: string
  day: number
  team: Team
  /** null when the team ran out of time without answering. */
  optionId: OptionId | null
  outcome: Outcome
  points: number
}

export type GameState = {
  screen: Screen
  /** Index into QUESTION_SEQUENCE (0–19). Day and team are derived from it. */
  step: number
  /** Epoch ms when the current question's 30 s window closes; null outside QUESTION. */
  questionDeadline: number | null
  selectedAnswer: OptionId | null
  showFeedback: boolean
  scores: Scores
  history: AnswerRecord[]
  /** Last scored answer — drives the feedback screen and score animation. */
  lastAnswer: AnswerRecord | null
  reflection: string | null
  gameFinished: boolean
}
