import ChildrenProp from 'models/ChildrenProp'
import Fade from 'components/Fade'
import classnames, { overflow, position } from 'classnames/tailwind'
import useHasWebkit from 'hooks/useHasWebkit'
import useIsOverflow from 'hooks/useIsOverflow'

const wrapperStyles = classnames(
  overflow('overflow-y-auto', 'overflow-x-hidden'),
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

  const ffBorderRight =
    isOverflow && !hasWebKit ? '1.5rem solid #0d0030' : 'none'
  const wrapperRight = isOverflow && hasWebKit ? '0.7rem' : '0rem'

  return (
    <div
      className={wrapperStyles}
      ref={wrapperRef}
      style={{
        marginRight: `-${wrapperRight}`,
        paddingRight: wrapperRight,
      }}
    >
      {(fade === 'both' || fade === 'top') && <Fade />}
      <div
        className={wrapperStyles}
        style={{
          borderRight: ffBorderRight,
        }}
      >
        {children}
      </div>
      {(fade === 'both' || fade === 'bottom') && <Fade bottom />}
    </div>
  )
}
