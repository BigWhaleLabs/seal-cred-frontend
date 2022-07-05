import { useEffect, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

export default function () {
  const wrapper = useResizeDetector({ handleWidth: false })

  const [isOverflow, setIsOverflow] = useState(false)

  const scrollRefHeight = wrapper.ref?.current?.scrollHeight

  useEffect(() => {
    const { current } = wrapper.ref
    if (!current) return

    const isScrollable = current.scrollHeight > current.clientHeight
    setIsOverflow(isScrollable)
  }, [wrapper.ref, wrapper.height, scrollRefHeight])

  return {
    isOverflow,
    wrapperRef: wrapper.ref,
  }
}
