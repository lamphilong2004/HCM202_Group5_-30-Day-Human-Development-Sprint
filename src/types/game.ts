export type Team = 'A' | 'B'

export type Suitability = 'BEST' | 'GOOD' | 'CONSIDER'

export type Option = {
  id: string
  text: string
  /** Base points before the day multiplier. */
  score: number
  suitability: Suitability
  /** One-line comment shown when this option is chosen. */
  note: string
}

export type Scenario = {
  id: string
  day: number
  team: Team
  theme: string
  label?: string
  question: string
  options: Option[]
  explanation: string
  theory: string[]
  multiplier?: number
}

export type DayInfo = {
  day: number
  theme: string
  /** Short name used in the final journey recap. */
  journey: string
  multiplier: number
}

export type Screen =
  | 'START'
  | 'QUESTION'
  | 'FEEDBACK'
  | 'DAY_COMPLETE'
  | 'FINAL_RESULT'
  | 'REFLECTION'

export type Scores = Record<Team, number>

export type AnswerRecord = {
  scenarioId: string
  day: number
  team: Team
  optionId: string
  suitability: Suitability
  points: number
}

export type GameState = {
  screen: Screen
  currentDayIndex: number
  currentTeam: Team
  selectedAnswer: string | null
  showFeedback: boolean
  scores: Scores
  history: AnswerRecord[]
  /** Last scored answer — drives the feedback screen and score animation. */
  lastAnswer: AnswerRecord | null
  reflection: string | null
  gameFinished: boolean
}
