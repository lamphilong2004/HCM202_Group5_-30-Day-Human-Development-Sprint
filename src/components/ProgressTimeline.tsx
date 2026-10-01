import { DAYS, QUESTIONS_PER_DAY, QUESTION_SEQUENCE, formatDay } from '../data/scenarios'
import type { AnswerRecord } from '../types/game'
import { TEAM_STYLE } from './ui'

type Props = {
  currentDayIndex: number
  history: AnswerRecord[]
  finished?: boolean
  /** All four questions of the current day are answered (DAY_COMPLETE screen). */
  currentDone?: boolean
}

export function ProgressTimeline({ currentDayIndex, history, finished = false, currentDone = false }: Props) {
  const answered = (questionId: string) => history.some((h) => h.questionId === questionId)

  return (
    <nav aria-label="Tiến trình 30 ngày" className="mx-auto w-full max-w-[88rem] px-4 sm:px-8">
      <ol className="flex items-start">
        {DAYS.map((d, i) => {
          const done = finished || i < currentDayIndex || (currentDone && i === currentDayIndex)
          const current = !finished && !currentDone && i === currentDayIndex
          const last = i === DAYS.length - 1
          const turns = QUESTION_SEQUENCE.slice(i * QUESTIONS_PER_DAY, (i + 1) * QUESTIONS_PER_DAY)
          return (
            <li key={d.day} className={`flex items-start ${last ? '' : 'flex-1'}`}>
              <div className="flex w-14 flex-col items-center sm:w-20" aria-current={current ? 'step' : undefined}>
                <span
                  className={`grid size-4 place-items-center rounded-full border-2 transition-colors duration-500 ${
                    done ? 'border-teal bg-teal' : current ? 'border-teal bg-ink' : 'border-line bg-ink'
                  }`}
                >
                  {current && <span className="size-1.5 rounded-full bg-teal" />}
                </span>
                <span
                  className={`tabular mt-2 text-xs font-semibold tracking-[0.14em] ${
                    current ? 'text-paper' : done ? 'text-fog' : 'text-mist/70'
                  }`}
                >
                  DAY {formatDay(d.day)}
                </span>
                {d.multiplier > 1 && (
                  <span className="mt-1 rounded bg-amber/15 px-1.5 text-[0.625rem] font-bold tracking-wider text-amber">
                    ×{d.multiplier}
                  </span>
                )}
                {current && (
                  <span className="mt-1.5 flex gap-1" aria-label="Lượt trong ngày: A, B, A, B">
                    {turns.map((t) => (
                      <span
                        key={t.id}
                        className={`h-1 w-2.5 rounded-full ${answered(t.id) ? TEAM_STYLE[t.team].bg : 'bg-line'}`}
                      />
                    ))}
                  </span>
                )}
              </div>
              {!last && (
                <span className="relative mt-[0.4375rem] h-0.5 flex-1 overflow-hidden rounded bg-line">
                  <span
                    className={`absolute inset-y-0 left-0 bg-teal transition-[width] duration-700 ${done ? 'w-full' : 'w-0'}`}
                  />
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
