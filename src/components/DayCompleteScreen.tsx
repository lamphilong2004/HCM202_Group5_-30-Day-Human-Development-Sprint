import { SUITABILITY_META, formatDay } from '../data/scenarios'
import type { AnswerRecord, DayInfo, Scores } from '../types/game'
import { Arrow, Button, SuitabilityMeter, TEAM_STYLE, TeamMark } from './ui'

type Props = {
  dayInfo: DayInfo
  nextDay: DayInfo
  scores: Scores
  history: AnswerRecord[]
  onNext: () => void
}

export function DayCompleteScreen({ dayInfo, nextDay, scores, history, onNext }: Props) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center py-4 text-center sm:py-10">
      <div className="eyebrow animate-fade-up text-teal">{dayInfo.theme}</div>
      <h1 className="mt-4 animate-fade-up font-display text-[clamp(3rem,7vw,6rem)] leading-none font-semibold [animation-delay:60ms]">
        Day {formatDay(dayInfo.day)} <span className="text-mist">complete</span>
      </h1>
      <p className="mt-5 animate-fade-up text-xl text-fog [animation-delay:120ms]">
        Hai đội đã hoàn thành thử thách của Day {formatDay(dayInfo.day)}.
      </p>

      <div className="mt-10 grid w-full animate-fade-up gap-4 [animation-delay:180ms] sm:grid-cols-2">
        {(['A', 'B'] as const).map((team) => {
          const rec = history.find((h) => h.day === dayInfo.day && h.team === team)
          return (
            <div key={team} className={`rounded-2xl border-t-4 ${TEAM_STYLE[team].border} bg-ink-2 p-6 text-left`}>
              <div className="flex items-center gap-3">
                <TeamMark team={team} />
                <span className="eyebrow text-fog">Team {team}</span>
              </div>
              <div className="tabular mt-4 font-display text-6xl font-semibold">{scores[team]}</div>
              {rec && (
                <div className="mt-4 flex items-center gap-3 text-sm text-mist">
                  <SuitabilityMeter suitability={rec.suitability} size="sm" />
                  <span>
                    Day {formatDay(dayInfo.day)}: {SUITABILITY_META[rec.suitability].label} · +{rec.points}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-10 animate-fade-in [animation-delay:300ms]">
        <Button onClick={onNext}>
          Tiếp tục đến Day {formatDay(nextDay.day)} <Arrow />
        </Button>
      </div>
    </div>
  )
}
