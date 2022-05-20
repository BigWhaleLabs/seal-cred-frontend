import { useCallback, useMemo, useState } from 'react'
import useThrottle from 'hooks/useThrottle'

const xsSize = 279
const smSize = 375
const mdSize = 600
const lgSize = 1023

export default function () {
  const [width, setWidth] = useState(window.innerWidth)

  const resizer = useCallback(() => setWidth(window.innerWidth), [])
  const throttledResizer = useThrottle(resizer, 1000)

  useMemo(() => {
    window.addEventListener('resize', throttledResizer, { passive: true })
    return () => {
      window.removeEventListener('resize', throttledResizer)
    }
  }, [throttledResizer])

  return {
    xxs: width > xsSize,
    xs: width > xsSize && width < smSize,
    sm: width > smSize,
    md: width > mdSize,
    lg: width > lgSize,
  }
}
