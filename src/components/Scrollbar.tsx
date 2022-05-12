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
  const scrollRef = useRef() as MutableRefObject<HTMLDivElement>
  const wrapRef = useRef() as MutableRefObject<HTMLDivElement>
  const overflows = useIsOverflow(wrapRef)
  const { sm, md } = useBreakpoints()

  const scrollMaxHeight = md ? maxHeight : sm ? 240 : 190

  const [scrollPosition, setScrollPosition] = useState<{
    top: boolean
    bottom: boolean
  }>({ top: false, bottom: true })

  const wrapperStyle = (overflows: boolean) =>
    classnames(
      overflows ? margin('mr-5') : undefined,
      transitionProperty('transition-all')
    )

  const handleScroll = () => {
    const { current } = scrollRef
    if (!current) return

    if (current.scrollTop <= 2 || current.scrollTop === 0) {
      setScrollPosition({ top: false, bottom: true })
    } else if (
      current.scrollTop + current.clientHeight ===
      current.scrollHeight
    ) {
      setScrollPosition({ top: true, bottom: false })
    } else {
      setScrollPosition({ top: true, bottom: true })
    }
  }

  useEffect(() => {
    const { current } = scrollRef
    if (!current) return

    if (current.offsetHeight <= current.scrollHeight) {
      setScrollPosition({ top: false, bottom: false })
    }

    current.addEventListener('scroll', handleScroll)
    return () => {
      current.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={classnames(
        position('relative'),
        overflow('overflow-x-hidden')
      )}
    >
      {scrollPosition.top && (fade === 'both' || fade === 'top') && <Fade />}
      <SimpleBar
        style={{ maxHeight: scrollMaxHeight }}
        scrollableNodeProps={{ ref: scrollRef }}
      >
        <div ref={wrapRef} className={wrapperStyle(overflows)}>
          {children}
        </div>
      </SimpleBar>
      {scrollPosition.bottom && (fade === 'both' || fade === 'bottom') && (
        <Fade bottom />
      )}
    </div>
  )
}

export default Scrollbar
