import type { Option, OptionId } from '../types/game'

type Props = {
  option: Option
  /** This option was clicked and is now locked in. */
  chosen: boolean
  disabled: boolean
  /** Greyed out because another option was locked in (not during the brief start-up disable). */
  dimmed: boolean
  onSelect: (id: OptionId) => void
  index: number
}

export function AnswerOption({ option, chosen, disabled, dimmed, onSelect, index }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      disabled={disabled}
      aria-label={`Phương án ${option.id}: ${option.text}`}
      style={{ animationDelay: `${120 + index * 60}ms` }}
      className={`group flex w-full animate-fade-up items-center gap-4 rounded-2xl border-2 px-4 py-3 text-left transition-[background-color,border-color,color,opacity] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal disabled:cursor-default sm:gap-5 sm:px-5 ${
        chosen
          ? 'border-teal bg-paper text-navy'
          : dimmed
            ? 'border-line bg-ink-2 text-paper opacity-50'
            : disabled
              ? 'border-line bg-ink-2 text-paper'
              : 'border-line bg-ink-2 text-paper hover:border-teal/70 hover:bg-ink-3'
      }`}
    >
      <span
        className={`grid size-11 shrink-0 place-items-center rounded-xl font-display text-2xl font-semibold transition-colors duration-200 sm:size-12 ${
          chosen ? 'bg-teal-deep text-paper' : 'border border-line text-fog group-hover:text-paper'
        }`}
      >
        {option.id}
      </span>
      <span className="flex-1 text-lg leading-snug font-medium lg:text-xl">{option.text}</span>
    </button>
  )
}
