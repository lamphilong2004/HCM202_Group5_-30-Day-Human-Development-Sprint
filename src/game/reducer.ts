import { TOTAL_DAYS, getScenario, pointsFor } from '../data/scenarios'
import type { GameState } from '../types/game'

export type GameAction =
  | { type: 'START' }
  | { type: 'SELECT'; optionId: string }
  | { type: 'CONFIRM' }
  | { type: 'CONTINUE' }
  | { type: 'NEXT_DAY' }
  | { type: 'TO_REFLECTION' }
  | { type: 'REFLECT'; choice: string }
  | { type: 'RESTART' }
  | { type: 'HOME' }

export const initialState: GameState = {
  screen: 'START',
  currentDayIndex: 0,
  currentTeam: 'A',
  selectedAnswer: null,
  showFeedback: false,
  scores: { A: 0, B: 0 },
  history: [],
  lastAnswer: null,
  reflection: null,
  gameFinished: false,
}

const firstQuestion: GameState = { ...initialState, screen: 'QUESTION' }

/**
 * Every transition is guarded by the current screen, so a repeated dispatch
 * (double click, key repeat) is a no-op — points can only be added once per
 * question, on the single QUESTION → FEEDBACK transition.
 */
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START':
      return state.screen === 'START' ? firstQuestion : state

    case 'SELECT':
      return state.screen === 'QUESTION' ? { ...state, selectedAnswer: action.optionId } : state

    case 'CONFIRM': {
      if (state.screen !== 'QUESTION' || !state.selectedAnswer) return state
      const scenario = getScenario(state.currentDayIndex, state.currentTeam)
      const option = scenario.options.find((o) => o.id === state.selectedAnswer)
      if (!option) return state
      if (state.history.some((h) => h.scenarioId === scenario.id)) return state

      const points = pointsFor(option, scenario)
      const record = {
        scenarioId: scenario.id,
        day: scenario.day,
        team: state.currentTeam,
        optionId: option.id,
        suitability: option.suitability,
        points,
      }
      return {
        ...state,
        screen: 'FEEDBACK',
        showFeedback: true,
        scores: { ...state.scores, [state.currentTeam]: state.scores[state.currentTeam] + points },
        history: [...state.history, record],
        lastAnswer: record,
      }
    }

    case 'CONTINUE': {
      if (state.screen !== 'FEEDBACK') return state
      const reset = { selectedAnswer: null, showFeedback: false }
      if (state.currentTeam === 'A') {
        return { ...state, ...reset, screen: 'QUESTION', currentTeam: 'B' }
      }
      const isLastDay = state.currentDayIndex === TOTAL_DAYS - 1
      return isLastDay
        ? { ...state, ...reset, screen: 'FINAL_RESULT', gameFinished: true }
        : { ...state, ...reset, screen: 'DAY_COMPLETE' }
    }

    case 'NEXT_DAY':
      if (state.screen !== 'DAY_COMPLETE') return state
      return {
        ...state,
        screen: 'QUESTION',
        currentDayIndex: state.currentDayIndex + 1,
        currentTeam: 'A',
      }

    case 'TO_REFLECTION':
      return state.screen === 'FINAL_RESULT' ? { ...state, screen: 'REFLECTION' } : state

    case 'REFLECT':
      return state.screen === 'REFLECTION' ? { ...state, reflection: action.choice } : state

    case 'RESTART':
      return firstQuestion

    case 'HOME':
      return initialState
  }
}
