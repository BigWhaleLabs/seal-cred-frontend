import { useCallback, useRef } from 'react'

export default function (callback: (...args: unknown[]) => void, delay = 20) {
  const isThrottled = useRef(false)

  const throttledCallback = useCallback(
    (...args) => {
      if (isThrottled.current) return

      callback(args)
      isThrottled.current = true
      setTimeout(() => (isThrottled.current = false), delay)
    },
    [callback, delay]
  )

  return throttledCallback
}
