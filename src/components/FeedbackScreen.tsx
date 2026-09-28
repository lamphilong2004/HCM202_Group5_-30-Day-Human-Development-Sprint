import { SUITABILITY_META, TOTAL_DAYS, formatDay } from '../data/scenarios'
import { useCountUp } from '../hooks/useCountUp'
import type { AnswerRecord, DayInfo, Scenario } from '../types/game'
import { Arrow, Button, SuitabilityMeter, TEAM_STYLE, TeamMark } from './ui'

type Props = {
  scenario: Scenario
  answer: AnswerRecord
  dayInfo: DayInfo
  dayIndex: number
  nextHint: string
  continueLabel: string
  onContinue: () => void
}

export function FeedbackScreen({ scenario, answer, dayInfo, dayIndex, nextHint, continueLabel, onContinue }: Props) {
  const chosen = scenario.options.find((o) => o.id === answer.optionId)!
  const best = scenario.options.find((o) => o.suitability === 'BEST')!
  const isBest = chosen.id === best.id
  const multiplier = scenario.multiplier ?? 1
  const points = useCountUp(answer.points, { from: 0, duration: 900 })
  const style = TEAM_STYLE[answer.team]

  return (
    <div className="space-y-6">
      <div className="flex animate-fade-up flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="tabular font-display text-3xl font-semibold">Day {formatDay(dayInfo.day)}</span>
          <span className="text-xl font-bold tracking-wide text-teal uppercase">{dayInfo.theme}</span>
          <span className="eyebrow text-mist">
            Round {dayIndex + 1} / {TOTAL_DAYS}
          </span>
          {multiplier > 1 && (
            <span className="eyebrow rounded-md bg-amber px-2 py-1 !text-[0.6875rem] text-ink">
              Final Day · ×{multiplier} Points
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <TeamMark team={answer.team} size="md" />
          <span className="eyebrow text-fog">Kết quả · Team {answer.team}</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Result */}
        <section
          className={`flex animate-stamp flex-col rounded-3xl border-t-4 ${style.border} bg-ink-2 p-7 sm:p-8 lg:col-span-5`}
          aria-live="polite"
        >
          <div className="eyebrow text-mist">Lựa chọn của bạn</div>
          <div className="mt-3 flex items-start gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-paper font-display text-3xl font-semibold text-navy">
              {chosen.id}
            </span>
            <p className="pt-1 text-lg leading-snug text-fog">{chosen.text}</p>
          </div>

          <div className="mt-6 border-t border-line pt-6">
            <SuitabilityMeter suitability={answer.suitability} />
            <div className="mt-3 font-display text-[clamp(2rem,3.4vw,3rem)] leading-none font-semibold uppercase">
              {SUITABILITY_META[answer.suitability].label}
            </div>
            <div className="mt-5 flex items-baseline gap-3">
              <span
                className={`tabular font-display text-[clamp(3.5rem,6vw,5.5rem)] leading-none font-semibold ${style.text}`}
              >
                +{points}
              </span>
              <span className="eyebrow text-fog">Points</span>
            </div>
            {multiplier > 1 && (
              <div className="mt-3 text-sm text-mist">
                Final Day: {chosen.score} × {multiplier} = {answer.points}
              </div>
            )}
          </div>

          <div className="mt-auto flex animate-fade-in flex-wrap items-center justify-between gap-4 pt-8 [animation-delay:350ms]">
            <span className="text-sm text-mist">{nextHint}</span>
            <Button onClick={onContinue}>
              {continueLabel} <Arrow />
            </Button>
          </div>
        </section>

        {/* Analysis */}
        <section className="animate-fade-up rounded-3xl bg-paper p-7 text-navy [animation-delay:150ms] sm:p-8 lg:col-span-7">
          <h2 className="eyebrow text-teal-deep">Vì sao?</h2>
          <p className="mt-3 text-xl leading-relaxed font-medium sm:text-[1.375rem]">{scenario.explanation}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className={`rounded-2xl bg-paper-2/70 p-5 ${isBest ? 'sm:col-span-2' : ''}`}>
              <div className="eyebrow text-stone">Về lựa chọn {chosen.id}</div>
              <p className="mt-2 text-base leading-relaxed">{chosen.note}</p>
            </div>
            {!isBest && (
              <div className="rounded-2xl border border-teal-deep/30 p-5">
                <div className="eyebrow text-teal-deep">Phương án phù hợp nhất · {best.id}</div>
                <p className="mt-2 text-base leading-relaxed">{best.text}</p>
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-paper-2 pt-5">
            <h3 className="eyebrow text-stone">Liên hệ lý luận</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {scenario.theory.map((t) => (
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
