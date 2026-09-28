import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { SUITABILITY_META } from '../data/scenarios'
import type { Suitability, Team } from '../types/game'

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

/** Three-step meter: ●●● best, ●●○ good, ●○○ consider. */
export function SuitabilityMeter({
  suitability,
  tone = 'dark',
  size = 'md',
}: {
  suitability: Suitability
  tone?: 'dark' | 'paper'
  size?: 'sm' | 'md'
}) {
  const { level, label } = SUITABILITY_META[suitability]
  const on = tone === 'dark' ? 'bg-teal' : 'bg-teal-deep'
  const off = tone === 'dark' ? 'bg-line' : 'bg-paper-2'
  const dims = size === 'sm' ? 'h-1.5 w-4' : 'h-2 w-8'
  return (
    <span className="inline-flex gap-1" role="img" aria-label={label}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={`${dims} rounded-full ${i <= level ? on : off}`} />
      ))}
    </span>
  )
}
