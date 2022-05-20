import { useCallback, useMemo, useState } from 'react'
import useThrottle from 'hooks/useThrottle'

export default function () {
  const [scroll, setScroll] = useState(0)

  const handleScroll = useCallback(() => {
    setScroll(
      window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
    )
  }, [])
  const throttledCallback = useThrottle(handleScroll, 10)

  useMemo(() => {
    window.addEventListener('scroll', throttledCallback, true)

    return () => window.removeEventListener('scroll', throttledCallback, true)
  }, [throttledCallback])

  return scroll
}
