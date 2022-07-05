import { useResizeDetector } from 'react-resize-detector'
import ChildrenProp from 'models/ChildrenProp'
import Fade from 'components/Fade'
import classnames, { overflow, position } from 'classnames/tailwind'
import useIsOverflow from 'hooks/useIsOverflow'

const wrapper = classnames(overflow('overflow-y-auto'), position('relative'))

type FadeType = 'top' | 'bottom' | 'both'

interface ScrollbarProps {
  fade?: FadeType
}

export default function ({
  children,
  fade = 'both',
}: ChildrenProp & ScrollbarProps) {
  const { height = 0, ref } = useResizeDetector({ handleWidth: false })

  const { overflows, isOnTop, isOnBottom, wrapperRef } = useIsOverflow(
    ref,
    height
  )

  return (
    <div
      ref={wrapperRef}
      className={wrapper}
      style={{
        marginRight: overflows ? '-0.5rem' : '0rem',
      }}
    >
      {isOnTop && (fade === 'both' || fade === 'top') && <Fade />}
      {children}
      {isOnBottom && (fade === 'both' || fade === 'bottom') && <Fade bottom />}
    </div>
  )
}
