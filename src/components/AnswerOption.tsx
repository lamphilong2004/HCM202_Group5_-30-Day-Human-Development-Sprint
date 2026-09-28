import type { Option } from '../types/game'

type Props = {
  option: Option
  selected: boolean
  onSelect: (id: string) => void
  index: number
}

export function AnswerOption({ option, selected, onSelect, index }: Props) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(option.id)}
      style={{ animationDelay: `${120 + index * 70}ms` }}
      className={`group flex w-full animate-fade-up items-center gap-5 rounded-2xl border-2 p-4 text-left transition-[background-color,border-color,color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal sm:gap-6 sm:p-5 ${
        selected
          ? 'border-teal bg-paper text-navy'
          : 'border-line bg-ink-2 text-paper hover:border-mist/60 hover:bg-ink-3'
      }`}
    >
      <span
        className={`grid size-12 shrink-0 place-items-center rounded-xl font-display text-2xl font-semibold transition-colors duration-200 sm:size-14 ${
          selected ? 'bg-teal-deep text-paper' : 'border border-line text-fog group-hover:text-paper'
        }`}
      >
        {option.id}
      </span>
      <span className="flex-1 text-lg leading-snug font-medium sm:text-xl">{option.text}</span>
      <span
        aria-hidden
        className={`grid size-7 shrink-0 place-items-center rounded-full border-2 transition-colors duration-200 ${
          selected ? 'border-teal-deep bg-teal-deep' : 'border-line'
        }`}
      >
        {selected && (
          <svg viewBox="0 0 16 16" className="size-4 text-paper" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </button>
  )
}
