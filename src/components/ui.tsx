import type { ButtonHTMLAttributes, ReactNode } from 'react'
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

export const RESULT_LABEL: Record<Outcome, string> = {
  CORRECT: 'Chính xác',
  INCORRECT: 'Chưa chính xác',
  TIMEOUT: 'Hết giờ',
}

/** Round check / cross / clock mark; `tone` picks contrast for dark or paper surfaces. */
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
  const color =
    outcome === 'CORRECT'
      ? tone === 'dark'
        ? 'bg-teal text-ink'
        : 'bg-teal-deep text-paper'
      : outcome === 'TIMEOUT'
        ? 'border-2 border-dashed border-red/70 text-red'
        : tone === 'dark'
          ? 'border-2 border-line text-mist'
          : 'border-2 border-stone/40 text-stone'
  return (
    <span
      role="img"
      aria-label={RESULT_LABEL[outcome]}
      className={`${dims} ${color} inline-grid shrink-0 place-items-center rounded-full`}
    >
      <svg viewBox="0 0 16 16" className={icon} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
        {outcome === 'CORRECT' && <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />}
        {outcome === 'INCORRECT' && <path d="M5 5l6 6M11 5l-6 6" strokeLinecap="round" />}
        {outcome === 'TIMEOUT' && <path d="M8 4.5V8l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
    </span>
  )
}
