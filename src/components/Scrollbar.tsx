import 'simplebar/dist/simplebar.min.css'
import { FC, MutableRefObject, useRef } from 'react'
import Fade from 'components/Fade'
import SimpleBar from 'simplebar-react'
import classnames, {
  margin,
  overflow,
  position,
  transitionProperty,
} from 'classnames/tailwind'
import useIsOverflow from 'helpers/useIsOverflow'

type FadeType = 'top' | 'bottom' | 'both'

const outerBox = classnames(position('relative'), overflow('overflow-x-hidden'))

const Scrollbar: FC<{ maxHeight?: number; fade?: FadeType }> = ({
  children,
  maxHeight = 350,
  fade = 'both',
}) => {
  const scrollRef = useRef() as MutableRefObject<HTMLDivElement>
  const wrapRef = useRef() as MutableRefObject<HTMLDivElement>
  const { overflows, isOnTop, isOnBottom, scrollMaxHeight } = useIsOverflow(
    wrapRef,
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

export default Scrollbar
