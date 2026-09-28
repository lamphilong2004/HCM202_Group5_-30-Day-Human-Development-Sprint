import { BASE_POINTS, DAYS, SUITABILITY_META, formatDay } from '../data/scenarios'
import type { Suitability } from '../types/game'
import { Arrow, Button, SuitabilityMeter } from './ui'

export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <section className="lg:col-span-7">
        <div className="eyebrow animate-fade-up text-teal">FPT University · 30-Day Human Development Sprint</div>
        <h1 className="mt-5 animate-fade-up font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] font-semibold tracking-tight [animation-delay:60ms]">
          30-Day <br className="hidden sm:block" />
          Sprint Battle
        </h1>
        <p className="mt-6 max-w-2xl animate-fade-up text-xl leading-relaxed text-fog [animation-delay:120ms] sm:text-2xl">
          Mô phỏng 30 ngày tự rèn luyện — 10 tình huống, 2 đội, một hành trình.
        </p>
        <div className="mt-8 max-w-2xl animate-fade-up space-y-3 text-lg leading-relaxed text-mist [animation-delay:180ms]">
          <p>Hai đội sẽ lần lượt trải qua 5 mốc của hành trình 30 ngày.</p>
          <p>Mỗi đội nhận một tình huống khác nhau nhưng cùng chủ đề.</p>
          <p>Sau mỗi lựa chọn, trò chơi sẽ phân tích quyết định và liên hệ với nội dung xây dựng con người.</p>
        </div>
        <div className="mt-10 animate-fade-up [animation-delay:240ms]">
          <Button onClick={onStart} className="px-10 py-5 text-lg">
            Bắt đầu <Arrow />
          </Button>
        </div>
      </section>

      <aside className="animate-fade-up space-y-5 [animation-delay:200ms] lg:col-span-5">
        <div className="rounded-2xl bg-paper p-6 text-navy sm:p-8">
          <div className="eyebrow text-stone">Hành trình</div>
          <ol className="mt-4 divide-y divide-paper-2">
            {DAYS.map((d) => (
              <li key={d.day} className="flex items-baseline gap-4 py-3">
                <span className="tabular w-16 shrink-0 text-sm font-bold tracking-[0.12em] text-teal-deep">
                  DAY {formatDay(d.day)}
                </span>
                <span className="flex-1 text-lg font-medium">{d.theme}</span>
                {d.multiplier > 1 && (
                  <span className="rounded bg-navy px-2 py-0.5 text-xs font-bold tracking-wider text-amber">
                    FINAL ×{d.multiplier}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-line p-6 sm:p-8">
          <div className="eyebrow text-mist">Cách tính điểm</div>
          <ul className="mt-4 space-y-3">
            {(Object.keys(BASE_POINTS) as Suitability[]).map((s) => (
              <li key={s} className="flex items-center gap-4">
                <SuitabilityMeter suitability={s} size="sm" />
                <span className="flex-1 text-base text-fog">{SUITABILITY_META[s].label}</span>
                <span className="tabular font-semibold text-paper">+{BASE_POINTS[s]}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-mist">Day 30 là thử thách cuối: điểm nhân đôi.</p>
        </div>
      </aside>

      <p className="animate-fade-in border-t border-line pt-6 text-sm leading-relaxed text-mist [animation-delay:400ms] lg:col-span-12">
        “30 ngày” là khung mô phỏng do Nhóm 05 thiết kế, không phải khoảng thời gian được Hồ Chí Minh quy định. Các
        tình huống là ví dụ vận dụng do nhóm xây dựng; điểm số chỉ là cơ chế trò chơi, không đánh giá phẩm chất của
        người chơi.
      </p>
    </div>
  )
}
