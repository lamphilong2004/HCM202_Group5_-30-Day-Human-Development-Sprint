import { useCountUp } from '../hooks/useCountUp'
import type { AnswerRecord, Scores, Team } from '../types/game'
import { TEAM_STYLE, TeamMark } from './ui'

type Props = {
  scores: Scores
  activeTeam: Team | null
  /** Most recent gain to flash beside the score (feedback screen only). */
  gain: AnswerRecord | null
}

function TeamScore({ team, score, active, gain }: { team: Team; score: number; active: boolean; gain: AnswerRecord | null }) {
  const shown = useCountUp(score)
  const style = TEAM_STYLE[team]
  return (
    <div
      className={`relative flex items-center gap-3 rounded-xl border px-3 py-2 transition-colors duration-300 sm:px-4 ${
        active ? `${style.border} ${style.soft}` : 'border-line bg-ink-2'
      }`}
    >
      <TeamMark team={team} size="sm" />
      <div className="leading-none">
        <div className={`eyebrow whitespace-nowrap !text-[0.625rem] ${active ? style.text : 'text-mist'}`}>
          {active ? 'Đang lượt' : `Team ${team}`}
        </div>
        <div className="tabular mt-1 min-w-[3.5ch] font-display text-2xl font-semibold text-paper sm:text-3xl">
          {shown}
        </div>
      </div>
      {gain && gain.team === team && gain.points > 0 && (
        <span
          key={gain.questionId}
          className={`absolute -bottom-3 right-2 animate-gain rounded-md ${style.bg} px-1.5 py-0.5 text-xs font-bold text-ink`}
        >
          +{gain.points}
        </span>
      )}
    </div>
  )
}

export function ScoreBoard({ scores, activeTeam, gain }: Props) {
  return (
    <div className="flex items-center gap-2 sm:gap-3" aria-label="Bảng điểm">
      {(['A', 'B'] as const).map((t) => (
        <TeamScore key={t} team={t} score={scores[t]} active={activeTeam === t} gain={gain} />
      ))}
    </div>
  )
}
