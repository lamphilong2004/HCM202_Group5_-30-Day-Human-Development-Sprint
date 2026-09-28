import { REFLECTION_OPTIONS } from '../data/scenarios'
import { Arrow, Button } from './ui'

type Props = {
  reflection: string | null
  onReflect: (choice: string) => void
  onRestart: () => void
  onHome: () => void
}

export function ReflectionScreen({ reflection, onReflect, onRestart, onHome }: Props) {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <div>
        <div className="eyebrow animate-fade-up text-teal">Phản tỉnh</div>
        <h1 className="mt-4 animate-fade-up font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight font-semibold [animation-delay:60ms]">
          Sau hành trình 30 ngày mô phỏng, điều gì khó nhất trong quá trình tự rèn luyện?
        </h1>
      </div>

      <div role="radiogroup" aria-label="Điều khó nhất" className="grid animate-fade-up gap-3 [animation-delay:140ms] sm:grid-cols-2 lg:grid-cols-3">
        {REFLECTION_OPTIONS.map((r, i) => {
          const selected = reflection === r
          return (
            <button
              key={r}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onReflect(r)}
              className={`flex items-center gap-4 rounded-2xl border-2 p-5 text-left text-lg font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal ${
                selected ? 'border-teal bg-paper text-navy' : 'border-line bg-ink-2 text-paper hover:border-mist/60'
              }`}
            >
              <span className={`tabular text-sm font-bold ${selected ? 'text-teal-deep' : 'text-mist'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {r}
            </button>
          )
        })}
      </div>

      {reflection && (
        <div key="statement" className="animate-fade-up space-y-8">
          <div className="rounded-3xl bg-paper p-8 text-navy sm:p-10">
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-snug font-medium">
              30 ngày không tạo ra một con người hoàn toàn mới.
            </p>
            <p className="mt-4 text-xl leading-relaxed text-stone">
              Đây là một thử nghiệm nhỏ nhằm chuyển những định hướng về tự rèn luyện thành các lựa chọn và hành động
              cụ thể.
            </p>
            <p className="eyebrow mt-6 text-teal-deep">Nhóm 05 · HCM202</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button onClick={onRestart}>
              Chơi lại <Arrow />
            </Button>
            <Button variant="secondary" onClick={onHome}>
              Về màn hình đầu
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
