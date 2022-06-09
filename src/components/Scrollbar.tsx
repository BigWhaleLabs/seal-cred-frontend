import {
  MutableRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'preact/hooks'
import { useRef } from 'react'
import ChildrenProp from 'models/ChildrenProp'
import Fade from 'components/Fade'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  display,
  flexDirection,
  flexGrow,
  overflow,
  position,
} from 'classnames/tailwind'
import useIsOverflow from 'hooks/useIsOverflow'

type FadeType = 'top' | 'bottom' | 'both'

interface ScrollbarProps {
  fade?: FadeType
}

const scrollContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  flexGrow('grow'),
  position('relative')
)

export default function ({
  children,
  fade = 'both',
}: ChildrenProp & ScrollbarProps) {
  const container = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    if (container.current) {
      setHeight(container.current.offsetHeight)
    }
  }, [])

  const wrapRef = useRef() as MutableRef<HTMLDivElement>
  const thumbRef = useRef() as MutableRef<HTMLDivElement>
  const [thumbHeight, setThumbHeight] = useState(100)

  const { overflows, scrollMaxHeight, isOnTop, isOnBottom } = useIsOverflow(
    wrapRef,
    height
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
    <div ref={container} className={scrollContainer}>
      <div
        ref={wrapRef}
        className={classNamesToString(
          overflow('overflow-auto'),
          'scrollbar-hide'
        )}
        style={{
          maxHeight: scrollMaxHeight,
          marginRight: overflows ? '1rem' : undefined,
        }}
        onScroll={handleScroll}
      >
        {overflows && (
          <div className={classNamesToString('custom-scrollbar-body')}>
            <div
              ref={thumbRef}
              className={classNamesToString('custom-scrollbar-thumb')}
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
