import { DAYS, formatDay } from '../data/scenarios'
import { useCountUp } from '../hooks/useCountUp'
import type { AnswerRecord, Scores, Team } from '../types/game'
import { Arrow, Button, SuitabilityMeter, TEAM_STYLE, TeamMark } from './ui'

type Props = {
  scores: Scores
  history: AnswerRecord[]
  onNext: () => void
}

function FinalScore({ team, score, winner }: { team: Team; score: number; winner: boolean }) {
  const shown = useCountUp(score, { from: 0, duration: 1200 })
  const style = TEAM_STYLE[team]
  return (
    <div
      className={`relative rounded-3xl border-2 p-7 transition-colors sm:p-9 ${
        winner ? `${style.border} ${style.soft}` : 'border-line bg-ink-2'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <TeamMark team={team} size="md" />
          <span className="eyebrow text-fog">Team {team}</span>
        </div>
        {winner && (
          <span className={`eyebrow rounded-md ${style.bg} px-2.5 py-1 !text-[0.6875rem] text-ink`}>
            Điểm cao nhất
          </span>
        )}
      </div>
      <div className="mt-6 flex items-baseline gap-3">
        <span
          className={`tabular font-display text-[clamp(4rem,9vw,7.5rem)] leading-none font-semibold ${
            winner ? style.text : 'text-paper'
          }`}
        >
          {shown}
        </span>
        <span className="eyebrow text-mist">Points</span>
      </div>
    </div>
  )
}

export function FinalResultScreen({ scores, history, onNext }: Props) {
  const tie = scores.A === scores.B
  const winner: Team | null = tie ? null : scores.A > scores.B ? 'A' : 'B'
  const rec = (day: number, team: Team) => history.find((h) => h.day === day && h.team === team)

  return (
    <div className="space-y-10">
      <div className="text-center">
        <div className="eyebrow animate-fade-up text-teal">30-Day Sprint Complete</div>
        <h1 className="mt-4 animate-fade-up font-display text-[clamp(2.75rem,6vw,5rem)] leading-none font-semibold [animation-delay:60ms]">
          {tie ? 'Hòa' : `Team ${winner} dẫn điểm`}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl animate-fade-up text-base text-mist [animation-delay:120ms]">
          Kết quả chỉ phản ánh điểm số trong trò chơi — không phải thước đo phẩm chất của bất kỳ đội hay thành viên
          nào.
        </p>
      </div>

      <div className="grid animate-fade-up gap-5 [animation-delay:180ms] md:grid-cols-2">
        <FinalScore team="A" score={scores.A} winner={winner === 'A'} />
        <FinalScore team="B" score={scores.B} winner={winner === 'B'} />
      </div>

      <section className="animate-fade-up rounded-3xl bg-paper p-6 text-navy [animation-delay:260ms] sm:p-8">
        <h2 className="eyebrow text-stone">Hành trình đã đi qua</h2>
        <ol className="mt-4 divide-y divide-paper-2">
          {DAYS.map((d) => (
            <li key={d.day} className="grid grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-2 py-3 sm:grid-cols-[5rem_1fr_auto_auto] sm:gap-x-8">
              <span className="tabular text-sm font-bold tracking-[0.12em] text-teal-deep">DAY {formatDay(d.day)}</span>
              <span className="text-lg font-semibold">
                {d.journey}
                {d.multiplier > 1 && <span className="ml-2 text-xs font-bold text-amber-deep">×{d.multiplier}</span>}
              </span>
              {(['A', 'B'] as const).map((t) => {
                const r = rec(d.day, t)
                return (
                  <span key={t} className="col-start-2 flex items-center gap-2 text-sm sm:col-start-auto">
                    <span className={`w-4 font-bold ${TEAM_STYLE[t].onPaper}`}>{t}</span>
                    {r ? (
                      <>
                        <SuitabilityMeter suitability={r.suitability} tone="paper" size="sm" />
                        <span className="tabular w-10 text-right font-semibold">+{r.points}</span>
                      </>
                    ) : (
                      <span className="text-stone">—</span>
                    )}
                  </span>
                )
              })}
            </li>
          ))}
        </ol>
      </section>

      <div className="flex animate-fade-in justify-center [animation-delay:400ms]">
        <Button onClick={onNext}>
          Tiếp tục phản tỉnh <Arrow />
        </Button>
      </div>
    </div>
  )
}
