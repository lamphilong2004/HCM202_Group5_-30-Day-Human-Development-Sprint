import { DAYS, OUTCOMES, OUTCOME_LABEL, QUESTIONS_PER_TEAM, formatDay } from '../data/scenarios'
import { useCountUp } from '../hooks/useCountUp'
import type { AnswerRecord, Scores, Team } from '../types/game'
import { Arrow, Button, ResultMark, TEAM_STYLE, TeamMark } from './ui'

type Props = {
  scores: Scores
  history: AnswerRecord[]
  onNext: () => void
}

function FinalScore({
  team,
  score,
  records,
  winner,
}: {
  team: Team
  score: number
  records: AnswerRecord[]
  winner: boolean
}) {
  const count = (o: AnswerRecord['outcome']) => records.filter((r) => r.outcome === o).length
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
          <span className={`eyebrow rounded-md ${style.bg} px-2.5 py-1 !text-[0.6875rem] text-ink`}>Điểm cao nhất</span>
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
      <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-line pt-4 text-sm sm:grid-cols-3" aria-label={`Thống kê ${QUESTIONS_PER_TEAM} câu`}>
        {OUTCOMES.map((o) => (
          <li key={o} className="flex items-center gap-2" data-outcome={o}>
            <ResultMark outcome={o} size="sm" />
            <span className="text-mist">{OUTCOME_LABEL[o]}</span>
            <span className="tabular ml-auto font-semibold text-paper sm:ml-1">{count(o)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FinalResultScreen({ scores, history, onNext }: Props) {
  const tie = scores.A === scores.B
  const winner: Team | null = tie ? null : scores.A > scores.B ? 'A' : 'B'
  const recordsOf = (team: Team) => history.filter((h) => h.team === team)

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
        <FinalScore team="A" score={scores.A} records={recordsOf('A')} winner={winner === 'A'} />
        <FinalScore team="B" score={scores.B} records={recordsOf('B')} winner={winner === 'B'} />
      </div>

      <section className="animate-fade-up rounded-3xl bg-paper p-6 text-navy [animation-delay:260ms] sm:p-8">
        <h2 className="eyebrow text-stone">Hành trình đã đi qua</h2>
        <ol className="mt-4 divide-y divide-paper-2">
          {DAYS.map((d) => (
            <li
              key={d.day}
              className="grid grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-2 py-3 sm:grid-cols-[5rem_1fr_auto_auto] sm:gap-x-8"
            >
              <span className="tabular text-sm font-bold tracking-[0.12em] text-teal-deep">DAY {formatDay(d.day)}</span>
              <span className="text-lg font-semibold">
                {d.journey}
                {d.multiplier > 1 && <span className="ml-2 text-xs font-bold text-amber-deep">×{d.multiplier}</span>}
              </span>
              {(['A', 'B'] as const).map((t) => {
                const recs = history.filter((h) => h.day === d.day && h.team === t)
                return (
                  <span key={t} className="col-start-2 flex items-center gap-2 text-sm sm:col-start-auto">
                    <span className={`w-4 font-bold ${TEAM_STYLE[t].onPaper}`}>{t}</span>
                    <span className="flex gap-1">
                      {recs.map((r) => (
                        <ResultMark key={r.questionId} outcome={r.outcome} size="sm" tone="paper" />
                      ))}
                    </span>
                    <span className="tabular w-11 text-right font-semibold">
                      +{recs.reduce((s, r) => s + r.points, 0)}
                    </span>
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
