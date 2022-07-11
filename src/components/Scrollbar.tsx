import ChildrenProp from 'models/ChildrenProp'
import Fade from 'components/Fade'
import classnames, { overflow, position } from 'classnames/tailwind'

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
  return (
    <div className={wrapperStyles}>
      {(fade === 'both' || fade === 'top') && <Fade />}
      {children}
      {(fade === 'both' || fade === 'bottom') && <Fade bottom />}
    </div>
  )
}
