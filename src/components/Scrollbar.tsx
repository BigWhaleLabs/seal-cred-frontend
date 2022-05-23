import { MutableRef } from 'preact/hooks'
import { position } from 'classnames/tailwind'
import { useRef } from 'react'
import ChildrenProp from 'models/ChildrenProp'
import Fade from 'components/Fade'
import useIsOverflow from 'hooks/useIsOverflow'

type FadeType = 'top' | 'bottom' | 'both'

interface ScrollbarProps {
  maxHeight?: number
  fade?: FadeType
}

export default function ({
  children,
  maxHeight = 350,
  fade = 'both',
}: ChildrenProp & ScrollbarProps) {
  const wrapRef = useRef() as MutableRef<HTMLDivElement>
  const thumbRef = useRef() as MutableRef<HTMLDivElement>

  const { overflows, scrollMaxHeight, isOnTop, isOnBottom } = useIsOverflow(
    wrapRef,
    maxHeight
  )

  const handleScroll = () => {
    if (!thumbRef.current || !wrapRef.current) return
    const wrapCurrent = wrapRef.current

    // .scrollTop counts whole box, not only visible
    // that's why we should divide it by the visible to get, how many visible boxes in scrollable one
    const numberOfViews = wrapCurrent.scrollHeight / wrapCurrent.clientHeight
    const scroll = wrapCurrent.scrollTop / numberOfViews

    thumbRef.current.style.top = scroll + 'px'
  }

  return (
    <div className={position('relative')}>
      <div
        ref={wrapRef}
        class="scrollable-wrapper"
        style={{
          maxHeight: scrollMaxHeight,
          marginRight: overflows ? '1rem' : undefined,
        }}
        onScroll={handleScroll}
      >
        {overflows && (
          <div class="custom-scrollbar-body">
            <div class="custom-scrollbar-thumb" ref={thumbRef} />
          </div>
        )}

        {isOnTop && (fade === 'both' || fade === 'top') && <Fade />}

        {children}

        {isOnBottom && (fade === 'both' || fade === 'bottom') && (
          <Fade bottom />
        )}
      </div>
    </div>
  )
}
