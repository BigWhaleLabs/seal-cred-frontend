import { MutableRef, useCallback, useEffect, useState } from 'preact/hooks'
import { overflow, position } from 'classnames/tailwind'
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
  const [thumbHeight, setThumbHeight] = useState(100)

  const { overflows, scrollMaxHeight, isOnTop, isOnBottom } = useIsOverflow(
    wrapRef,
    maxHeight
  )

  const handleScroll = () => {
    if (!thumbRef.current || !wrapRef.current) return
    const wrapCurrent = wrapRef.current

    // .scrollTop counts whole box, not only visible
    // we should divide whole box by the visible to get how many visible boxes are in scrollable container
    const numberOfViews = wrapCurrent.scrollHeight / wrapCurrent.clientHeight
    const scroll = wrapCurrent.scrollTop / numberOfViews

    thumbRef.current.style.top = scroll + 'px'
  }

  // Listens if something inside the wrapBox has changed
  const refCallback = useCallback(<T extends HTMLElement>(node: T | null) => {
    if (!node) return
    const numberOfViews = node.scrollHeight / node.clientHeight
    setThumbHeight(100 / numberOfViews)
  }, [])
  useEffect(() => {
    refCallback(wrapRef.current)
  })

  return (
    <div className={position('relative')}>
      <div
        ref={wrapRef}
        className={overflow('overflow-auto') + ' scrollbar-hide'}
        style={{
          maxHeight: scrollMaxHeight,
          marginRight: overflows ? '1rem' : undefined,
        }}
        onScroll={handleScroll}
      >
        {overflows && (
          <div class="custom-scrollbar-body">
            <div
              ref={thumbRef}
              class="custom-scrollbar-thumb"
              style={{ height: thumbHeight + '%' }}
            />
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
