import { MutableRefObject, useEffect, useState } from 'react'

export default function useOnScreen(
  ref: MutableRefObject<HTMLDivElement>,
  rootMargin = '0px'
) {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const { current } = ref
    if (!current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin,
      }
    )
    observer.observe(current)
    return () => {
      observer.unobserve(current)
    }
  }, [ref, rootMargin])

  return isIntersecting
}
