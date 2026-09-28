import { useEffect, useReducer } from 'react'
import { DayCompleteScreen } from './components/DayCompleteScreen'
import { FeedbackScreen } from './components/FeedbackScreen'
import { FinalResultScreen } from './components/FinalResultScreen'
import { GameHeader } from './components/GameHeader'
import { ProgressTimeline } from './components/ProgressTimeline'
import { QuestionScreen } from './components/QuestionScreen'
import { ReflectionScreen } from './components/ReflectionScreen'
import { StartScreen } from './components/StartScreen'
import { DAYS, TOTAL_DAYS, formatDay, getScenario } from './data/scenarios'
import { gameReducer, initialState } from './game/reducer'

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const { screen, currentDayIndex, currentTeam, scores, history, lastAnswer } = state

  const dayInfo = DAYS[currentDayIndex]
  const scenario = getScenario(currentDayIndex, currentTeam)
  const inTurn = screen === 'QUESTION' || screen === 'FEEDBACK'
  const isLastDay = currentDayIndex === TOTAL_DAYS - 1
  const screenKey = `${screen}-${currentDayIndex}-${currentTeam}`

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [screenKey])

  const nextHint =
    currentTeam === 'A'
      ? `Tiếp theo: Team B · Day ${formatDay(dayInfo.day)}`
      : isLastDay
        ? 'Tiếp theo: kết quả chung cuộc'
        : `Tiếp theo: tổng kết Day ${formatDay(dayInfo.day)}`

  return (
    <div className="flex min-h-dvh flex-col">
      <GameHeader
        scores={scores}
        activeTeam={inTurn ? currentTeam : null}
        gain={screen === 'FEEDBACK' ? lastAnswer : null}
        onReset={screen === 'START' ? undefined : () => dispatch({ type: 'RESTART' })}
      />

      {(inTurn || screen === 'DAY_COMPLETE') && (
        <div className="pt-5">
          <ProgressTimeline
            currentDayIndex={currentDayIndex}
            history={history}
            currentDone={screen === 'DAY_COMPLETE'}
          />
        </div>
      )}

      <main key={screenKey} className="mx-auto w-full max-w-[88rem] flex-1 px-4 py-6 sm:px-8 sm:py-8">
        {screen === 'START' && <StartScreen onStart={() => dispatch({ type: 'START' })} />}

        {screen === 'QUESTION' && (
          <QuestionScreen
            scenario={scenario}
            dayInfo={dayInfo}
            dayIndex={currentDayIndex}
            team={currentTeam}
            selected={state.selectedAnswer}
            onSelect={(optionId) => dispatch({ type: 'SELECT', optionId })}
            onConfirm={() => dispatch({ type: 'CONFIRM' })}
          />
        )}

        {screen === 'FEEDBACK' && lastAnswer && (
          <FeedbackScreen
            scenario={scenario}
            answer={lastAnswer}
            dayInfo={dayInfo}
            dayIndex={currentDayIndex}
            nextHint={nextHint}
            continueLabel="Tiếp tục"
            onContinue={() => dispatch({ type: 'CONTINUE' })}
          />
        )}

        {screen === 'DAY_COMPLETE' && (
          <DayCompleteScreen
            dayInfo={dayInfo}
            nextDay={DAYS[currentDayIndex + 1]}
            scores={scores}
            history={history}
            onNext={() => dispatch({ type: 'NEXT_DAY' })}
          />
        )}

        {screen === 'FINAL_RESULT' && (
          <FinalResultScreen scores={scores} history={history} onNext={() => dispatch({ type: 'TO_REFLECTION' })} />
        )}

        {screen === 'REFLECTION' && (
          <ReflectionScreen
            reflection={state.reflection}
            onReflect={(choice) => dispatch({ type: 'REFLECT', choice })}
            onRestart={() => dispatch({ type: 'RESTART' })}
            onHome={() => dispatch({ type: 'HOME' })}
          />
        )}
      </main>
    </div>
  )
}
