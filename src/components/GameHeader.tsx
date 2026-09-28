import { useEffect, useState } from 'react'
import type { AnswerRecord, Scores, Team } from '../types/game'
import { ScoreBoard } from './ScoreBoard'

type Props = {
  scores: Scores
  activeTeam: Team | null
  gain: AnswerRecord | null
  onReset?: () => void
}

export function GameHeader({ scores, activeTeam, gain, onReset }: Props) {
  // Two-step reset so a stray click during the demo doesn't wipe the game.
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    if (!armed) return
    const id = setTimeout(() => setArmed(false), 3000)
    return () => clearTimeout(id)
  }, [armed])

  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-[88rem] items-center justify-end gap-4 px-4 py-3 sm:justify-between sm:px-8">
        <div className="hidden min-w-0 sm:block">
          <div className="eyebrow truncate text-mist">HCM202 · Nhóm 05 · HCM-TT-C6-03</div>
          <div className="mt-0.5 hidden font-display text-lg font-semibold text-paper sm:block">
            30-Day Sprint Battle
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <ScoreBoard scores={scores} activeTeam={activeTeam} gain={gain} />
          {onReset && (
            <button
              type="button"
              onClick={() => (armed ? (setArmed(false), onReset()) : setArmed(true))}
              className={`whitespace-nowrap rounded-lg border px-2.5 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline-2 focus-visible:outline-teal ${
                armed ? 'border-amber text-amber' : 'border-transparent text-mist hover:border-line hover:text-paper'
              }`}
              title="Chơi lại từ Day 01"
            >
              {armed ? 'Xác nhận?' : 'Chơi lại'}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
