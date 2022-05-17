import 'simplebar/dist/simplebar.min.css'
import { MutableRefObject, ReactNode, useRef } from 'react'
import Fade from 'components/Fade'
import SimpleBar from 'simplebar-react'
import classnames, {
  margin,
  overflow,
  position,
  transitionProperty,
} from 'classnames/tailwind'
import useIsOverflow from 'hooks/useIsOverflow'

type FadeType = 'top' | 'bottom' | 'both'

const outerBox = classnames(position('relative'), overflow('overflow-x-hidden'))

interface ScrollbarProps {
  children: ReactNode
  maxHeight?: number
  fade?: FadeType
}

export default function ({
  children,
  maxHeight = 350,
  fade = 'both',
}: ScrollbarProps) {
  const scrollRef = useRef() as MutableRefObject<HTMLDivElement>
  const wrapRef = useRef() as MutableRefObject<HTMLDivElement>
  const { overflows, isOnTop, isOnBottom, scrollMaxHeight } = useIsOverflow(
    scrollRef,
    maxHeight
  )

  const wrapperStyle = (overflows: boolean) =>
    classnames(
      overflows ? margin('mr-5') : undefined,
      transitionProperty('transition-all')
    )

  return (
    <div className={outerBox}>
      {isOnTop && (fade === 'both' || fade === 'top') && <Fade />}
      <SimpleBar
        style={{ maxHeight: scrollMaxHeight }}
        scrollableNodeProps={{ ref: scrollRef }}
      >
        <div ref={wrapRef} className={wrapperStyle(overflows)}>
          {children}
        </div>
      </SimpleBar>
      {isOnBottom && (fade === 'both' || fade === 'bottom') && <Fade bottom />}
    </div>
  )
}
