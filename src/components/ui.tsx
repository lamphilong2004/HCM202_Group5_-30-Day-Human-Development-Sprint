import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { OUTCOME_LABEL } from '../data/scenarios'
import type { Outcome, Team } from '../types/game'

export const TEAM_STYLE: Record<
  Team,
  { text: string; bg: string; border: string; ring: string; soft: string; onPaper: string }
> = {
  A: {
    text: 'text-teal',
    bg: 'bg-teal',
    border: 'border-teal',
    ring: 'ring-teal/60',
    soft: 'bg-teal/10',
    onPaper: 'text-teal-deep',
  },
  B: {
    text: 'text-amber',
    bg: 'bg-amber',
    border: 'border-amber',
    ring: 'ring-amber/60',
    soft: 'bg-amber/10',
    onPaper: 'text-amber-deep',
  },
}

/** Letter-in-square marker so teams are never distinguished by colour alone. */
export function TeamMark({ team, size = 'md' }: { team: Team; size?: 'sm' | 'md' | 'lg' }) {
  const dims = { sm: 'size-6 text-xs', md: 'size-8 text-sm', lg: 'size-12 text-xl' }[size]
  return (
    <span
      aria-hidden
      className={`${dims} ${TEAM_STYLE[team].bg} inline-grid shrink-0 place-items-center rounded-md font-bold text-ink`}
    >
      {team}
    </span>
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: ReactNode
}

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-3 rounded-xl font-semibold uppercase tracking-[0.12em] transition-[background-color,color,border-color,opacity,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal disabled:cursor-not-allowed active:translate-y-px'
  const variants = {
    primary:
      'bg-teal px-8 py-4 text-base text-ink hover:bg-[#5ad3c3] disabled:bg-ink-3 disabled:text-mist/60',
    secondary:
      'border border-line px-7 py-4 text-sm text-paper hover:border-mist hover:bg-ink-2 disabled:opacity-40',
    ghost: 'px-3 py-2 text-xs text-mist hover:text-paper',
  }
  return (
    <button type="button" className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}

export function Arrow() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10h11m-4-4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Filled check / outlined check / half disc / cross / clock — one glyph per outcome, never colour alone. */
export function ResultMark({
  outcome,
  size = 'md',
  tone = 'dark',
}: {
  outcome: Outcome
  size?: 'sm' | 'md'
  tone?: 'dark' | 'paper'
}) {
  const dims = size === 'sm' ? 'size-5' : 'size-9'
  const icon = size === 'sm' ? 'size-3' : 'size-5'
  const dark = tone === 'dark'
  const color = {
    BEST: dark ? 'bg-teal text-ink' : 'bg-teal-deep text-paper',
    GOOD: dark ? 'border-2 border-teal text-teal' : 'border-2 border-teal-deep text-teal-deep',
    PARTIAL: dark ? 'border-2 border-fog/70 text-fog' : 'border-2 border-stone/60 text-stone',
    UNSUITABLE: dark ? 'border-2 border-line text-mist' : 'border-2 border-stone/40 text-stone',
    TIMEOUT: 'border-2 border-dashed border-red/70 text-red',
  }[outcome]
  return (
    <span
      role="img"
      aria-label={OUTCOME_LABEL[outcome]}
      className={`${dims} ${color} inline-grid shrink-0 place-items-center rounded-full`}
    >
      <svg viewBox="0 0 16 16" className={icon} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
        {(outcome === 'BEST' || outcome === 'GOOD') && (
          <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
        )}
        {outcome === 'PARTIAL' && <path d="M8 2.5a5.5 5.5 0 0 0 0 11Z" fill="currentColor" stroke="none" />}
        {outcome === 'UNSUITABLE' && <path d="M5 5l6 6M11 5l-6 6" strokeLinecap="round" />}
        {outcome === 'TIMEOUT' && <path d="M8 4.5V8l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
    </span>
  )
}

const METER_FILL: Record<Outcome, number> = { BEST: 3, GOOD: 2, PARTIAL: 1, UNSUITABLE: 0, TIMEOUT: 0 }

/** Three-step suitability meter: ●●● best · ●●○ good · ●○○ partial · ○○○ unsuitable / timeout. */
export function LevelMeter({ outcome, size = 'md' }: { outcome: Outcome; size?: 'sm' | 'md' }) {
  const fill = METER_FILL[outcome]
  const dims = size === 'sm' ? 'h-1.5 w-4' : 'h-2 w-8'
  return (
    <span className="inline-flex gap-1" aria-hidden>
      {[1, 2, 3].map((i) => (
        <span key={i} className={`${dims} rounded-full ${i <= fill ? 'bg-teal' : 'bg-line'}`} />
      ))}
    </span>
  )
}
