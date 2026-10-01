import { useRef, useState } from 'react'
import {
  CORRECT_POINTS,
  KIND_LABEL,
  QUESTIONS_PER_TEAM,
  TOTAL_STEPS,
  formatDay,
  multiplierFor,
} from '../data/scenarios'
import { useCountUp } from '../hooks/useCountUp'
import type { AnswerRecord, DayInfo, Question } from '../types/game'
import { Arrow, Button, ResultMark, TEAM_STYLE, TeamMark } from './ui'

type Props = {
  question: Question
  answer: AnswerRecord
  dayInfo: DayInfo
  step: number
  nextHint: string
  /** Called once, when the MC clicks “Tiếp tục”. There is no auto-advance. */
  onContinue: (now: number) => void
}

const HEADLINE = {
  CORRECT: { title: 'Chính xác!', sub: null },
  INCORRECT: { title: 'Chưa chính xác', sub: 'Không sao — cùng xem lại đáp án bên cạnh.' },
  TIMEOUT: { title: 'Hết giờ!', sub: 'Bạn chưa trả lời' },
} as const

export function FeedbackScreen({ question, answer, dayInfo, step, nextHint, onContinue }: Props) {
  const chosen = answer.optionId ? question.options.find((o) => o.id === answer.optionId)! : null
  const key = question.options.find((o) => o.id === question.correct)!
  const multiplier = multiplierFor(question)
  const points = useCountUp(answer.points, { from: 0, duration: 900 })
  const style = TEAM_STYLE[answer.team]
  const headline = HEADLINE[answer.outcome]

  // Feedback stays up until the MC continues; the latch makes a double click advance only once.
  const latch = useRef(false)
  const [advanced, setAdvanced] = useState(false)
  const advance = () => {
    if (latch.current) return
    latch.current = true
    setAdvanced(true)
    onContinue(Date.now())
  }

  return (
    <div className="space-y-6">
      <div className="flex animate-fade-up flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="tabular font-display text-3xl font-semibold">Day {formatDay(dayInfo.day)}</span>
          <span className="text-xl font-bold tracking-wide text-teal uppercase">{dayInfo.theme}</span>
          <span className="eyebrow text-mist">
            Tiến độ {step + 1}/{TOTAL_STEPS}
          </span>
          {multiplier > 1 && (
            <span className="eyebrow rounded-md bg-amber px-2 py-1 !text-[0.6875rem] text-ink">
              Final Day · ×{multiplier} Points
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <TeamMark team={answer.team} size="md" />
          <span className="eyebrow text-fog">
            Kết quả · Team {answer.team} · Câu {question.number}/{QUESTIONS_PER_TEAM}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Result */}
        <section
          className={`flex animate-stamp flex-col rounded-3xl border-t-4 ${style.border} bg-ink-2 p-7 sm:p-8 lg:col-span-5`}
          aria-live="polite"
        >
          <div className="eyebrow text-mist">Lựa chọn của Team {answer.team}</div>
          <div className="mt-3 flex items-start gap-4">
            <span
              className={`grid size-14 shrink-0 place-items-center rounded-xl font-display text-3xl font-semibold ${
                chosen ? 'bg-paper text-navy' : 'border-2 border-dashed border-red/60 text-red'
              }`}
            >
              {chosen ? chosen.id : '—'}
            </span>
            <p className="pt-1 text-base leading-snug text-fog">{chosen ? chosen.text : 'Không có câu trả lời trong 30 giây.'}</p>
          </div>

          <div className="mt-4 border-t border-line pt-4">
            <div className="flex items-center gap-4">
              <ResultMark outcome={answer.outcome} />
              <div
                className={`font-display text-[clamp(1.75rem,2.9vw,2.75rem)] leading-none font-semibold uppercase lg:whitespace-nowrap ${
                  answer.outcome === 'TIMEOUT' ? 'text-red' : ''
                }`}
              >
                {headline.title}
              </div>
            </div>
            {answer.outcome === 'TIMEOUT' && (
              <div className="eyebrow mt-3 !text-sm text-fog">{headline.sub}</div>
            )}
            <div className="mt-4 flex items-baseline gap-3">
              <span
                className={`tabular font-display text-[clamp(3rem,5vw,5rem)] leading-none font-semibold ${
                  answer.correct ? style.text : 'text-mist'
                }`}
              >
                +{points}
              </span>
              <span className="eyebrow text-fog">Điểm</span>
            </div>
            {answer.outcome !== 'TIMEOUT' && (
              <div className="mt-3 text-sm text-mist">
                {answer.outcome === 'CORRECT'
                  ? multiplier > 1 && `Final Day: ${CORRECT_POINTS} × ${multiplier} = ${answer.points}`
                  : headline.sub}
              </div>
            )}
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
            <span className="text-sm text-mist">{nextHint}</span>
            <Button onClick={advance} disabled={advanced}>
              Tiếp tục <Arrow />
            </Button>
          </div>
        </section>

        {/* Analysis */}
        <section className="animate-fade-up rounded-3xl bg-paper p-6 text-navy [animation-delay:150ms] sm:p-7 lg:col-span-7">
          <div className="flex items-start gap-4 rounded-2xl border border-teal-deep/30 bg-teal-deep/5 p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal-deep font-display text-2xl font-semibold text-paper">
              {key.id}
            </span>
            <div>
              <div className="eyebrow text-teal-deep">Đáp án · {KIND_LABEL[question.kind]}</div>
              <p className="mt-1 text-lg leading-snug font-semibold">{key.text}</p>
            </div>
          </div>

          <h2 className="eyebrow mt-5 text-teal-deep">Vì sao?</h2>
          <p className="mt-2 text-lg leading-relaxed font-medium">{question.explanation}</p>

          <div className="mt-5 border-t border-paper-2 pt-4">
            <h3 className="eyebrow text-stone">Liên hệ lý luận</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {question.theory.map((t) => (
                <li key={t} className="rounded-full bg-navy px-4 py-1.5 text-base font-medium text-paper">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
