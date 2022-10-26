import { useCallback, useMemo, useState } from 'preact/hooks'

export default function () {
  const [scrolledFromTop, setScrolledFromTop] = useState(false)
  const onScroll = useCallback(() => {
    setScrolledFromTop(window.scrollY > 0)
  }, [])
  useMemo(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])
  return scrolledFromTop
}
