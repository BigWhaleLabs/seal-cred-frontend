import { useCallback, useEffect, useRef } from 'react'

export default function (callback: (...args: unknown[]) => void, delayMs = 20) {
  const isThrottled = useRef(false)
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    return () => (mounted.current = false)
  })

  const throttledCallback = useCallback(
    (...args: unknown[]) => {
      if (isThrottled.current || !mounted.current) return

      callback(args)

      isThrottled.current = true
      setTimeout(() => {
        isThrottled.current = false
      }, delayMs)
    },
    [callback, delayMs]
  )

  return throttledCallback
}
