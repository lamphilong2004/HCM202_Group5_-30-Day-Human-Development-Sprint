import { useEffect, useRef, useState } from 'react'
import { KIND_LABEL, QUESTIONS_PER_TEAM, TOTAL_STEPS, formatDay } from '../data/scenarios'
import { QUESTION_SECONDS } from '../game/timing'
import type { DayInfo, OptionId, Question, Team } from '../types/game'
import { AnswerOption } from './AnswerOption'
import { QuestionTimer } from './QuestionTimer'
import { TEAM_STYLE, TeamMark } from './ui'

type Props = {
  question: Question
  dayInfo: DayInfo
  step: number
  deadline: number
  onAnswer: (id: OptionId) => void
  onTimeout: (now: number) => void
}

export function DayMeta({ dayInfo, question, step }: { dayInfo: DayInfo; question: Question; step: number }) {
  return (
    <div className="flex items-end gap-5 sm:gap-7">
      <div className="leading-none">
        <div className="eyebrow text-mist">Day</div>
        <div className="tabular font-display text-[clamp(3.25rem,6vw,5.5rem)] leading-[0.85] font-semibold">
          {formatDay(dayInfo.day)}
        </div>
      </div>
      <div className="pb-1">
        <div className="text-[clamp(1.125rem,2vw,1.75rem)] leading-tight font-bold tracking-wide text-teal uppercase">
          {dayInfo.theme}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className={`eyebrow ${TEAM_STYLE[question.team].text}`}>
            Câu {question.number}/{QUESTIONS_PER_TEAM} · Team {question.team}
          </span>
          <span className="eyebrow text-mist">
            Tiến độ {step + 1}/{TOTAL_STEPS}
          </span>
          {dayInfo.multiplier > 1 && (
            <span className="eyebrow rounded-md bg-amber px-3 py-1.5 !text-sm text-ink">
              Final Day · ×{dayInfo.multiplier} Points
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function TurnBadge({ team, label = 'Đang lượt' }: { team: Team; label?: string }) {
  const style = TEAM_STYLE[team]
  return (
    <div className={`flex items-center gap-4 rounded-2xl border-2 ${style.border} ${style.soft} px-5 py-3`}>
      <TeamMark team={team} size="lg" />
      <div className="leading-none">
        <div className={`eyebrow ${style.text}`}>{label}</div>
        <div className="mt-1.5 font-display text-3xl font-semibold">Team {team}</div>
      </div>
    </div>
  )
}

/** Answer buttons stay disabled this long after the question appears, so the second click of a
 *  double click on “Tiếp tục” cannot land on an answer of the new question. */
const ACCIDENTAL_CLICK_MS = 400

export function QuestionScreen({ question, dayInfo, step, deadline, onAnswer, onTimeout }: Props) {
  const team = question.team
  // Locks the buttons on the first click or on expiry; the reducer is the real guard.
  const latch = useRef(false)
  const [locked, setLocked] = useState<OptionId | 'TIMEOUT' | null>(null)
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setArmed(true), ACCIDENTAL_CLICK_MS)
    return () => window.clearTimeout(id)
  }, [])

  const answer = (id: OptionId) => {
    if (latch.current || !armed) return
    latch.current = true
    setLocked(id)
    onAnswer(id)
  }
  const expire = (now: number) => {
    if (latch.current) return
    latch.current = true
    setLocked('TIMEOUT')
    onTimeout(now)
  }

  return (
    <div className="space-y-6">
      <div className="flex animate-fade-up flex-wrap items-end justify-between gap-5">
        <DayMeta dayInfo={dayInfo} question={question} step={step} />
        <div className="flex flex-wrap items-center gap-3">
          <TurnBadge team={team} />
          <QuestionTimer deadline={deadline} onExpire={expire} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <article className="animate-fade-up rounded-3xl bg-paper p-7 text-navy [animation-delay:60ms] sm:p-9 lg:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <span className="eyebrow text-teal-deep">
              Câu {formatDay(question.number)} · {KIND_LABEL[question.kind]}
            </span>
            <span className={`eyebrow ${TEAM_STYLE[team].onPaper}`}>Team {team}</span>
          </div>
          <p className="mt-5 font-display text-[clamp(1.375rem,2.1vw,2.125rem)] leading-[1.3] font-medium">
            {question.question}
          </p>
        </article>

        <div className="flex flex-col gap-3 lg:col-span-7">
          <div role="group" aria-label="Các phương án" className="flex flex-col gap-2.5">
            {question.options.map((o, i) => (
              <AnswerOption
                key={o.id}
                option={o}
                index={i}
                chosen={locked === o.id}
                disabled={locked !== null || !armed}
                dimmed={locked !== null}
                onSelect={answer}
              />
            ))}
          </div>
          <p className="text-sm text-mist">
            Bấm một phương án để trả lời — lựa chọn đầu tiên là đáp án cuối cùng. Mỗi câu có {QUESTION_SECONDS} giây.
          </p>
        </div>
      </div>
    </div>
  )
}
