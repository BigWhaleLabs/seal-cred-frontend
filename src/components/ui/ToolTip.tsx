import { Tooltip } from '@material-tailwind/react/components/Tooltip'
import { highlightedText } from 'components/ui/Text'
import { placement } from '@material-tailwind/react/types/components/popover'
import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  backgroundColor,
  borderRadius,
  padding,
  width,
  zIndex,
} from 'classnames/tailwind'

const tooltipClasses = classnames(
  backgroundColor('bg-formal-accent'),
  padding('py-2', 'px-5'),
  zIndex('z-50'),
  borderRadius('rounded-lg'),
  highlightedText(false),
  width('w-thin-card', 'md:w-card')
)

export default function ({
  text,
  position,
  children,
  disabled,
}: ChildrenProp & {
  text: string
  position: placement
  arrow?: boolean
  fitContainer?: boolean
  disabled?: boolean
}) {
  if (disabled) return <>{children}</>
  return (
    <Tooltip
      offset={15}
      className={tooltipClasses}
      content={text}
      children={children}
      placement={position}
    />
  )
}
