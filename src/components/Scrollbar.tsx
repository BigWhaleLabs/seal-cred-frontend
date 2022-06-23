import { MutableRef, useEffect, useState } from 'preact/hooks'
import { useRef } from 'react'
import { useResizeDetector } from 'react-resize-detector'
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
  parentHeight?: number
  bottomPadding?: number
  titlePadding?: number
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
  parentHeight = 0,
  bottomPadding = 0,
  titlePadding = 0,
}: ChildrenProp & ScrollbarProps) {
  const { height = 0, ref } = useResizeDetector({ handleWidth: false })
  const maximumHeightSize = 370

  const thumbRef = useRef() as MutableRef<HTMLDivElement>
  const [thumbHeight, setThumbHeight] = useState(100)
  const extaBottomPadding = parentHeight > maximumHeightSize ? bottomPadding : 0
  const extaTitlePadding = titlePadding
  const extraReservedSpace = extaBottomPadding + extaTitlePadding

  const { overflows, scrollMaxHeight, isOnTop, isOnBottom, wrapperRef } =
    useIsOverflow(ref, height - extraReservedSpace)

  const handleScroll = () => {
    if (!thumbRef.current || !wrapperRef.current) return
    const wrapCurrent = wrapperRef.current

    // .scrollTop counts whole box, not only visible
    // we should divide whole box by the visible to get how many visible boxes are in scrollable container
    const numberOfViews = wrapCurrent.scrollHeight / wrapCurrent.clientHeight
    const scroll = wrapCurrent.scrollTop / numberOfViews

    thumbRef.current.style.top = scroll + 'px'
  }

  // Listens if something inside the wrapBox has changed
  useEffect(() => {
    const { current } = wrapperRef
    if (!current) return

    setTimeout(() => {
      const numberOfViews = current.scrollHeight / current.clientHeight
      setThumbHeight(100 / numberOfViews)
    }, 400)
  }, [
    titlePadding,
    parentHeight,
    bottomPadding,
    ref,
    wrapperRef,
    wrapperRef.current?.scrollHeight,
    wrapperRef.current?.clientHeight,
  ])

  return (
    <div ref={ref} className={scrollContainer}>
      <div
        ref={wrapperRef}
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
