import { QUESTION_SEQUENCE, TOTAL_STEPS, isLastStepOfDay, pointsFor } from '../data/scenarios'
import type { AnswerRecord, GameState, OptionId } from '../types/game'
import { QUESTION_MS } from './timing'

/*
 * Timed actions carry `at` (Date.now() at dispatch) so the reducer stays pure,
 * and `step` so a late timer or click aimed at an earlier question is ignored.
 */
export type GameAction =
  | { type: 'START'; at: number }
  | { type: 'ANSWER'; step: number; optionId: OptionId; at: number }
  | { type: 'TIMEOUT'; step: number; at: number }
  | { type: 'CONTINUE'; step: number; at: number }
  | { type: 'NEXT_DAY'; at: number }
  | { type: 'TO_REFLECTION' }
  | { type: 'REFLECT'; choice: string }
  | { type: 'RESTART'; at: number }
  | { type: 'HOME' }

export const initialState: GameState = {
  screen: 'START',
  step: 0,
  questionDeadline: null,
  selectedAnswer: null,
  showFeedback: false,
  scores: { A: 0, B: 0 },
  history: [],
  lastAnswer: null,
  reflection: null,
  gameFinished: false,
}

const openQuestion = (state: GameState, step: number, at: number): GameState => ({
  ...state,
  screen: 'QUESTION',
  step,
  questionDeadline: at + QUESTION_MS,
  selectedAnswer: null,
  showFeedback: false,
})

/** Lock the current question with an answer (or null = timeout), score it, and open feedback. */
function lockQuestion(state: GameState, optionId: OptionId | null): GameState {
  const question = QUESTION_SEQUENCE[state.step]
  if (state.history.some((h) => h.questionId === question.id)) return state

  const { outcome, points } = pointsFor(question, optionId)
  const record: AnswerRecord = {
    questionId: question.id,
    day: question.day,
    team: question.team,
    optionId,
    outcome,
    points,
  }
  return {
    ...state,
    screen: 'FEEDBACK',
    questionDeadline: null,
    selectedAnswer: optionId,
    showFeedback: true,
    scores: { ...state.scores, [question.team]: state.scores[question.team] + points },
    history: [...state.history, record],
    lastAnswer: record,
  }
}

/**
 * Every transition is guarded by the current screen (and step / deadline for
 * timed actions), so duplicate dispatches — double clicks, a click racing the
 * timeout, a double click on “Tiếp tục” — are no-ops. Points can only
 * be added once per question, on the single QUESTION → FEEDBACK transition.
 */
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START':
      return state.screen === 'START' ? openQuestion(initialState, 0, action.at) : state

    case 'ANSWER': {
      if (state.screen !== 'QUESTION' || action.step !== state.step || state.questionDeadline === null) return state
      // A click processed at or after the deadline counts as no answer.
      const optionId = action.at < state.questionDeadline ? action.optionId : null
      return lockQuestion(state, optionId)
    }

    case 'TIMEOUT':
      if (state.screen !== 'QUESTION' || action.step !== state.step || state.questionDeadline === null) return state
      if (action.at < state.questionDeadline) return state
      return lockQuestion(state, null)

    case 'CONTINUE': {
      if (state.screen !== 'FEEDBACK' || action.step !== state.step) return state
      const closed = { ...state, selectedAnswer: null, showFeedback: false }
      if (state.step === TOTAL_STEPS - 1) return { ...closed, screen: 'FINAL_RESULT', gameFinished: true }
      if (isLastStepOfDay(state.step)) return { ...closed, screen: 'DAY_COMPLETE' }
      return openQuestion(state, state.step + 1, action.at)
    }

    case 'NEXT_DAY':
      return state.screen === 'DAY_COMPLETE' ? openQuestion(state, state.step + 1, action.at) : state

    case 'TO_REFLECTION':
      return state.screen === 'FINAL_RESULT' ? { ...state, screen: 'REFLECTION' } : state

    case 'REFLECT':
      return state.screen === 'REFLECTION' ? { ...state, reflection: action.choice } : state

    case 'RESTART':
      return openQuestion(initialState, 0, action.at)

    case 'HOME':
      return initialState
  }
}
