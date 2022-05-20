import { MutableRef } from 'preact/hooks'
import { useCallback, useEffect, useState } from 'react'
import useBreakpoints from 'hooks/useBreakpoints'

export default function (
  scrollRef: MutableRef<HTMLDivElement>,
  maxHeight: number
) {
  const { sm, md } = useBreakpoints()
  const scrollMaxHeight = md ? maxHeight : sm ? 240 : 190
  const [isOverflow, setIsOverflow] = useState<{
    overflows: boolean
    isOnTop: boolean
    isOnBottom: boolean
  }>({
    overflows: false,
    isOnTop: false,
    isOnBottom: true,
  })

  const handleScroll = useCallback(() => {
    const { current } = scrollRef
    if (!current) return

    if (current.scrollTop <= 2 || current.scrollTop === 0) {
      setIsOverflow((prevState) => ({
        ...prevState,
        isOnTop: false,
        isOnBottom: true,
      }))
    } else if (
      current.scrollTop + current.clientHeight ===
      current.scrollHeight
    ) {
      setIsOverflow((prevState) => ({
        ...prevState,
        isOnTop: true,
        isOnBottom: false,
      }))
    } else {
      setIsOverflow((prevState) => ({
        ...prevState,
        isOnTop: true,
        isOnBottom: true,
      }))
    }
  }, [scrollRef])

  const scrollRefHeight = scrollRef?.current?.scrollHeight

  useEffect(() => {
    const { current } = scrollRef
    if (!current) return

    const isScrollable = current.scrollHeight > scrollMaxHeight
    setIsOverflow((prevState) => ({
      ...prevState,
      isOnTop: false,
      isOnBottom: isScrollable,
      overflows: isScrollable,
    }))

    current.addEventListener('scroll', handleScroll)
    return () => {
      current.removeEventListener('scroll', handleScroll)
    }
  }, [scrollRef, scrollRefHeight, scrollMaxHeight, handleScroll])

  return { ...isOverflow, scrollMaxHeight }
}
