import 'simplebar/dist/simplebar.min.css'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import Fade from 'components/Fade'
import SimpleBar from 'simplebar-react'
import classnames, {
  margin,
  overflow,
  position,
  transitionProperty,
} from 'classnames/tailwind'
import useBreakpoints from 'helpers/useBreakpoints'
import useIsOverflow from 'helpers/useIsOverflow'

type FadeType = 'top' | 'bottom' | 'both'

const Scrollbar: FC<{ maxHeight?: number; fade?: FadeType }> = ({
  children,
  maxHeight = 350,
  fade = 'both',
}) => {
  const wrapRef = useRef() as MutableRefObject<HTMLDivElement>
  const overflows = useIsOverflow(wrapRef)
  const { sm, md } = useBreakpoints()

  const scrollMaxHeight = md ? maxHeight : sm ? 240 : 190

  const [showFade, setShowFade] = useState(false)

  const wrapperStyle = (overflows: boolean) =>
    classnames(
      overflows ? margin('mr-5') : undefined,
      transitionProperty('transition-all')
    )

  useEffect(() => {
    const { current } = wrapRef
    if (!current) return
    setShowFade(current.offsetHeight > scrollMaxHeight)
  }, [wrapRef, scrollMaxHeight])

  return (
    <div
      className={classnames(
        position('relative'),
        overflow('overflow-x-hidden')
      )}
    >
      {showFade && (fade === 'both' || fade === 'top') && <Fade />}
      <SimpleBar style={{ maxHeight: scrollMaxHeight }}>
        <div ref={wrapRef} className={wrapperStyle(overflows)}>
          {children}
        </div>
      </SimpleBar>
      {showFade && (fade === 'both' || fade === 'bottom') && <Fade bottom />}
    </div>
  )
}

export default Scrollbar
