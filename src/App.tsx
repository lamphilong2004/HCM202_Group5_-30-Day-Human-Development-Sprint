import { useEffect, useReducer } from 'react'
import { DayCompleteScreen } from './components/DayCompleteScreen'
import { FeedbackScreen } from './components/FeedbackScreen'
import { FinalResultScreen } from './components/FinalResultScreen'
import { GameHeader } from './components/GameHeader'
import { ProgressTimeline } from './components/ProgressTimeline'
import { QuestionScreen } from './components/QuestionScreen'
import { ReflectionScreen } from './components/ReflectionScreen'
import { StartScreen } from './components/StartScreen'
import { DAYS, QUESTION_SEQUENCE, TOTAL_STEPS, dayIndexOf, formatDay, isLastStepOfDay } from './data/scenarios'
import { gameReducer, initialState } from './game/reducer'

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const { screen, step, scores, history, lastAnswer } = state

  const question = QUESTION_SEQUENCE[step]
  const dayIndex = dayIndexOf(step)
  const dayInfo = DAYS[dayIndex]
  const inTurn = screen === 'QUESTION' || screen === 'FEEDBACK'
  // Includes the deadline so a reset on the same step still remounts fresh timers.
  const screenKey = `${screen}-${step}-${state.questionDeadline ?? ''}`

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [screenKey])

  const nextHint =
    step === TOTAL_STEPS - 1
      ? 'Tiếp theo: kết quả chung cuộc'
      : isLastStepOfDay(step)
        ? `Tiếp theo: tổng kết Day ${formatDay(dayInfo.day)}`
        : `Tiếp theo: Team ${QUESTION_SEQUENCE[step + 1].team} · Câu ${QUESTION_SEQUENCE[step + 1].number}`

  return (
    <div className="flex min-h-dvh flex-col">
      <GameHeader
        scores={scores}
        activeTeam={inTurn ? question.team : null}
        gain={screen === 'FEEDBACK' ? lastAnswer : null}
        onReset={screen === 'START' ? undefined : () => dispatch({ type: 'RESTART', at: Date.now() })}
      />

      {(inTurn || screen === 'DAY_COMPLETE') && (
        <div className="pt-5">
          <ProgressTimeline currentDayIndex={dayIndex} history={history} currentDone={screen === 'DAY_COMPLETE'} />
        </div>
      )}

      <main key={screenKey} className="mx-auto w-full max-w-[88rem] flex-1 px-4 py-6 sm:px-8 sm:py-6">
        {screen === 'START' && <StartScreen onStart={() => dispatch({ type: 'START', at: Date.now() })} />}

        {screen === 'QUESTION' && state.questionDeadline !== null && (
          <QuestionScreen
            question={question}
            dayInfo={dayInfo}
            step={step}
            deadline={state.questionDeadline!}
            onAnswer={(optionId) => dispatch({ type: 'ANSWER', step, optionId, at: Date.now() })}
            onTimeout={(at) => dispatch({ type: 'TIMEOUT', step, at })}
          />
        )}

        {screen === 'FEEDBACK' && lastAnswer && (
          <FeedbackScreen
            question={question}
            answer={lastAnswer}
            dayInfo={dayInfo}
            step={step}
            nextHint={nextHint}
            onContinue={(at) => dispatch({ type: 'CONTINUE', step, at })}
          />
        )}

        {screen === 'DAY_COMPLETE' && (
          <DayCompleteScreen
            dayInfo={dayInfo}
            nextDay={DAYS[dayIndex + 1]}
            scores={scores}
            history={history}
            onNext={() => dispatch({ type: 'NEXT_DAY', at: Date.now() })}
          />
        )}

        {screen === 'FINAL_RESULT' && (
          <FinalResultScreen scores={scores} history={history} onNext={() => dispatch({ type: 'TO_REFLECTION' })} />
        )}

        {screen === 'REFLECTION' && (
          <ReflectionScreen
            reflection={state.reflection}
            onReflect={(choice) => dispatch({ type: 'REFLECT', choice })}
            onRestart={() => dispatch({ type: 'RESTART', at: Date.now() })}
            onHome={() => dispatch({ type: 'HOME' })}
          />
        )}
      </main>
    </div>
  )
}
