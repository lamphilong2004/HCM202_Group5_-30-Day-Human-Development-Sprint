export type Team = 'A' | 'B'

export type OptionId = 'A' | 'B' | 'C' | 'D'

export type QuestionKind = 'THEORY' | 'APPLICATION'

export type Option = {
  id: OptionId
  text: string
}

export type Question = {
  /** e.g. "A01" = Team A, question 01. */
  id: string
  team: Team
  /** 1–10, the question's number within its team. */
  number: number
  day: number
  kind: QuestionKind
  question: string
  options: [Option, Option, Option, Option]
  correct: OptionId
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

export type Outcome = 'CORRECT' | 'INCORRECT' | 'TIMEOUT'

export type AnswerRecord = {
  questionId: string
  day: number
  team: Team
  /** null when the team ran out of time without answering. */
  optionId: OptionId | null
  outcome: Outcome
  /** True only for CORRECT; TIMEOUT counts as not correct in all statistics. */
  correct: boolean
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
