import ChildrenProp from 'models/ChildrenProp'
import Fade from 'components/Fade'
import classnames, {
  borderColor,
  borderStyle,
  borderWidth,
  overflow,
  position,
} from 'classnames/tailwind'
import useHasWebkit from 'hooks/useHasWebkit'
import useIsOverflow from 'hooks/useIsOverflow'

const ffScrollbarSpace = classnames(
  borderWidth('border-r-24'),
  borderStyle('border-solid'),
  borderColor('border-primary-dark')
)

const wrapperStyles = (isFirefox?: boolean) =>
  classnames(
    overflow('overflow-y-auto', 'overflow-x-hidden'),
    position('relative'),
    isFirefox ? ffScrollbarSpace : undefined
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

  const isFirefox = isOverflow && !hasWebKit
  const wrapperRight = isOverflow && hasWebKit ? '0.7rem' : '0rem'

  return (
    <div
      className={wrapperStyles()}
      ref={wrapperRef}
      style={{
        marginRight: `-${wrapperRight}`,
        paddingRight: wrapperRight,
      }}
    >
      {(fade === 'both' || fade === 'top') && <Fade />}
      <div className={wrapperStyles(isFirefox)}>{children}</div>
      {(fade === 'both' || fade === 'bottom') && <Fade bottom />}
    </div>
  )
}
