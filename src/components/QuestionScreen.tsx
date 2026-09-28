import { TOTAL_DAYS, formatDay } from '../data/scenarios'
import type { DayInfo, Scenario, Team } from '../types/game'
import { AnswerOption } from './AnswerOption'
import { Arrow, Button, TEAM_STYLE, TeamMark } from './ui'

type Props = {
  scenario: Scenario
  dayInfo: DayInfo
  dayIndex: number
  team: Team
  selected: string | null
  onSelect: (id: string) => void
  onConfirm: () => void
}

export function DayMeta({ dayInfo, dayIndex }: { dayInfo: DayInfo; dayIndex: number }) {
  return (
    <div className="flex items-end gap-5 sm:gap-7">
      <div className="leading-none">
        <div className="eyebrow text-mist">Day</div>
        <div className="tabular font-display text-[clamp(3.75rem,7vw,6rem)] leading-[0.85] font-semibold">
          {formatDay(dayInfo.day)}
        </div>
      </div>
      <div className="pb-1">
        <div className="text-[clamp(1.25rem,2.2vw,2rem)] leading-tight font-bold tracking-wide text-teal uppercase">
          {dayInfo.theme}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="eyebrow text-mist">
            Round {dayIndex + 1} / {TOTAL_DAYS}
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

export function QuestionScreen({ scenario, dayInfo, dayIndex, team, selected, onSelect, onConfirm }: Props) {
  return (
    <div className="space-y-8">
      <div className="flex animate-fade-up flex-wrap items-end justify-between gap-6">
        <DayMeta dayInfo={dayInfo} dayIndex={dayIndex} />
        <TurnBadge team={team} />
      </div>

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <article className="animate-fade-up rounded-3xl bg-paper p-7 text-navy [animation-delay:60ms] sm:p-9 lg:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <span className="eyebrow text-teal-deep">Tình huống · {scenario.id}</span>
            <span className={`eyebrow ${TEAM_STYLE[team].onPaper}`}>Team {team}</span>
          </div>
          {scenario.label && <div className="mt-4 text-lg font-semibold text-stone">{scenario.label}</div>}
          <p className="mt-3 font-display text-[clamp(1.5rem,2.3vw,2.25rem)] leading-[1.3] font-medium">
            {scenario.question}
          </p>
        </article>

        <div className="flex flex-col gap-4 lg:col-span-7">
          <div role="radiogroup" aria-label="Các phương án" className="flex flex-col gap-3 sm:gap-4">
            {scenario.options.map((o, i) => (
              <AnswerOption key={o.id} option={o} index={i} selected={selected === o.id} onSelect={onSelect} />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm text-mist">
              {selected ? `Team ${team} đã chọn phương án ${selected}.` : 'Chọn một phương án, sau đó xác nhận.'}
            </span>
            <Button onClick={onConfirm} disabled={!selected}>
              Xác nhận lựa chọn <Arrow />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
