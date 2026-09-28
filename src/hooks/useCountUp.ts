import { useEffect, useRef, useState } from 'react'

/** Animates a number toward `target` (ease-out). Decreases snap instantly. */
export function useCountUp(target: number, { from = target, duration = 700 } = {}) {
  const [value, setValue] = useState(from)
  const current = useRef(from)

  useEffect(() => {
    const start = current.current
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (target <= start || reduce) {
      current.current = target
      setValue(target)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration)
      const next = Math.round(start + (target - start) * (1 - Math.pow(1 - t, 3)))
      current.current = next
      setValue(next)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value
}
