import ChildrenProp from 'models/ChildrenProp'
import Fade from 'components/Fade'
import classnames, { overflow, position } from 'classnames/tailwind'
import useHasWebkit from 'hooks/useHasWebkit'
import useIsOverflow from 'hooks/useIsOverflow'

const wrapperStyles = classnames(
  overflow('overflow-y-auto'),
  position('relative')
)

type FadeType = 'top' | 'bottom' | 'both'

interface ScrollbarProps {
  fade?: FadeType
}

export default function ({
  children,
  fade = 'both',
}: ChildrenProp & ScrollbarProps) {
  const hasWebKit = useHasWebkit()
  const { isOverflow, wrapperRef } = useIsOverflow()

  return (
    <div
      ref={wrapperRef}
      className={wrapperStyles}
      style={{
        marginRight: isOverflow && hasWebKit ? '-0.7rem' : '0rem',
      }}
    >
      {(fade === 'both' || fade === 'top') && <Fade />}
      {children}
      {(fade === 'both' || fade === 'bottom') && <Fade bottom />}
    </div>
  )
}
