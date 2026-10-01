import { formatDay } from '../data/scenarios'
import type { AnswerRecord, DayInfo, Scores } from '../types/game'
import { Arrow, Button, ResultMark, TEAM_STYLE, TeamMark } from './ui'

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
        Hai đội đã hoàn thành 4 câu hỏi của Day {formatDay(dayInfo.day)}.
      </p>

      <div className="mt-10 grid w-full animate-fade-up gap-4 [animation-delay:180ms] sm:grid-cols-2">
        {(['A', 'B'] as const).map((team) => {
          const recs = history.filter((h) => h.day === dayInfo.day && h.team === team)
          const correct = recs.filter((r) => r.correct).length
          const earned = recs.reduce((sum, r) => sum + r.points, 0)
          return (
            <div key={team} className={`rounded-2xl border-t-4 ${TEAM_STYLE[team].border} bg-ink-2 p-6 text-left`}>
              <div className="flex items-center gap-3">
                <TeamMark team={team} />
                <span className="eyebrow text-fog">Team {team}</span>
              </div>
              <div className="tabular mt-4 font-display text-6xl font-semibold">{scores[team]}</div>
              <div className="mt-4 flex items-center gap-3 text-sm text-mist">
                <span className="flex gap-1.5">
                  {recs.map((r) => (
                    <ResultMark key={r.questionId} outcome={r.outcome} size="sm" />
                  ))}
                </span>
                <span>
                  Day {formatDay(dayInfo.day)}: {correct}/{recs.length} chính xác · +{earned}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-10 flex animate-fade-in flex-col items-center gap-3 [animation-delay:300ms]">
        <Button onClick={onNext}>
          Chặng tiếp theo <Arrow />
        </Button>
        <span className="text-sm text-mist">
          Day {formatDay(nextDay.day)} · {nextDay.theme}
        </span>
      </div>
    </div>
  )
}
