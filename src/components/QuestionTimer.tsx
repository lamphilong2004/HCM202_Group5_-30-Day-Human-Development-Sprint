import { useDeadline } from '../hooks/useDeadline'
import { QUESTION_MS, formatClock, secondsLeft } from '../game/timing'

type Props = {
  deadline: number
  onExpire: (now: number) => void
}

const RADIUS = 26
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function QuestionTimer({ deadline, onExpire }: Props) {
  const remaining = useDeadline(deadline, onExpire)
  const seconds = secondsLeft(remaining)
  const state = seconds === 0 ? 'out' : seconds <= 5 ? 'urgent' : seconds <= 10 ? 'warn' : 'normal'

  const tone = {
    normal: { box: 'border-line bg-ink-2', ring: 'stroke-paper', text: 'text-paper', label: 'text-mist' },
    warn: { box: 'border-amber/70 bg-amber/10', ring: 'stroke-amber', text: 'text-amber', label: 'text-amber' },
    urgent: { box: 'border-red bg-red/10', ring: 'stroke-red', text: 'text-red', label: 'text-red' },
    out: { box: 'border-red bg-red/15', ring: 'stroke-red', text: 'text-red', label: 'text-red' },
  }[state]

  return (
    <div
      role="timer"
      aria-label={`Thời gian còn lại: ${seconds} giây`}
      className={`flex items-center gap-4 rounded-2xl border-2 px-4 py-2.5 transition-colors duration-300 ${tone.box}`}
    >
      <svg viewBox="0 0 64 64" className="size-14 shrink-0 -rotate-90" aria-hidden>
        <circle cx="32" cy="32" r={RADIUS} fill="none" strokeWidth="6" className="stroke-line" />
        <circle
          cx="32"
          cy="32"
          r={RADIUS}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - remaining / QUESTION_MS)}
          className={`${tone.ring} transition-[stroke-dashoffset,stroke] duration-100 ease-linear`}
        />
      </svg>
      <div className="leading-none">
        <div className={`eyebrow ${tone.label}`}>{state === 'out' ? 'Hết giờ' : 'Thời gian'}</div>
        <div
          className={`tabular mt-1 font-display text-[2.75rem] leading-none font-semibold ${tone.text} ${
            state === 'urgent' ? 'motion-safe:animate-urgent' : ''
          }`}
        >
          {formatClock(seconds)}
        </div>
      </div>
    </div>
  )
}
