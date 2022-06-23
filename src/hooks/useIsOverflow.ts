import { MutableRef } from 'preact/hooks'
import { useCallback, useEffect, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import useBreakpoints from 'hooks/useBreakpoints'

export default function (
  blockRef: MutableRef<HTMLDivElement>,
  maxHeight: number
) {
  const wrapper = useResizeDetector({ handleWidth: false })
  const { sm, md } = useBreakpoints()
  // the maximum height of scroll container
  // on different screen sizes according to the design
  const scrollMaxHeight = md
    ? maxHeight > 270
      ? maxHeight
      : 270
    : sm
    ? 240
    : 190
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
    const { current } = wrapper.ref
    if (!current) return

    // if the user scrolled on two px show fade block at the top
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
  }, [wrapper.ref])

  const scrollRefHeight = wrapper.ref?.current?.scrollHeight

  useEffect(() => {
    const { current } = wrapper.ref
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
  }, [
    wrapper.ref,
    wrapper.height,
    blockRef,
    maxHeight,
    scrollRefHeight,
    scrollMaxHeight,
    handleScroll,
  ])

  return {
    ...isOverflow,
    scrollMaxHeight,
    wrapperRef: wrapper.ref,
  }
}
