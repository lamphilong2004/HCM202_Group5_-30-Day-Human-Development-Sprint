import { useEffect, useRef, useState } from 'react'

/**
 * Milliseconds left until `deadline` (epoch ms), recomputed from Date.now() on
 * every tick so it never drifts. Calls `onExpire(now)` once when it reaches 0.
 *
 * Background tabs throttle timers, so the hook also re-checks immediately when
 * the tab becomes visible again; the deadline itself never pauses. The timer is
 * cleared whenever the deadline changes or the component unmounts.
 */
export function useDeadline(deadline: number | null, onExpire: (now: number) => void, tickMs = 100) {
  const [remaining, setRemaining] = useState(() => (deadline === null ? 0 : Math.max(0, deadline - Date.now())))
  const onExpireRef = useRef(onExpire)
  useEffect(() => {
    onExpireRef.current = onExpire
  })

  useEffect(() => {
    if (deadline === null) return
    let timer: number | undefined
    let fired = false

    const tick = () => {
      window.clearTimeout(timer)
      const now = Date.now()
      const ms = deadline - now
      setRemaining(Math.max(0, ms))
      if (ms <= 0) {
        if (!fired) {
          fired = true
          onExpireRef.current(now)
        }
        return
      }
      timer = window.setTimeout(tick, Math.min(tickMs, ms))
    }

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && !fired) tick()
    }

    tick()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [deadline, tickMs])

  return remaining
}
