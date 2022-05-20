import { useCallback, useRef } from 'react'

export default function (callback: (...args: unknown[]) => void, delayMs = 20) {
  const isThrottled = useRef(false)

  const throttledCallback = useCallback(
    (...args: unknown[]) => {
      if (isThrottled.current) return

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
