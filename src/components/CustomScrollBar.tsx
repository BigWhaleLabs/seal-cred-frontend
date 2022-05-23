import { MutableRef } from 'preact/hooks'
import { useRef } from 'react'
import ChildrenProp from 'models/ChildrenProp'
import useIsOverflow from 'hooks/useIsOverflow'

interface CustomScrollBarProps {
  maxHeight: number
}

export default function ({
  children,
  maxHeight,
}: ChildrenProp & CustomScrollBarProps) {
  const wrapRef = useRef() as MutableRef<HTMLDivElement>
  const thumbRef = useRef() as MutableRef<HTMLDivElement>

  const handleScroll = () => {
    if (!thumbRef.current || !wrapRef.current) return
    const wrapCurrent = wrapRef.current

    // .scrollTop counts whole box, not only visible
    // that's why we should divide it by the visible to get, how many visible boxes in scrollable one
    const numberOfViews = wrapCurrent.scrollHeight / wrapCurrent.clientHeight
    const scroll = wrapCurrent.scrollTop / numberOfViews

    thumbRef.current.style.top = scroll + 'px'
  }

  const { overflows, scrollMaxHeight } = useIsOverflow(wrapRef, maxHeight)

  return (
    <div
      ref={wrapRef}
      class="scrollable-wrapper"
      style={{
        maxHeight: scrollMaxHeight,
        marginRight: overflows ? '1rem' : undefined,
      }}
      onScroll={handleScroll}
    >
      {overflows ? (
        <div class="custom-scrollbar-body">
          <div class="custom-scrollbar-thumb" ref={thumbRef} />
        </div>
      ) : undefined}

      {children}
    </div>
  )
}
