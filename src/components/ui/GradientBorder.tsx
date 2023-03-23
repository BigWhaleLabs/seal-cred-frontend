import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  backgroundColor,
  backgroundImage,
  borderRadius,
  boxShadow,
  gradientColorStops,
  padding,
  width,
} from 'classnames/tailwind'

const parentButtonWrapper = (enabled?: boolean) =>
  classnames(
    borderRadius('rounded-full'),
    backgroundImage('bg-gradient-to-r'),
    padding('p-px'),
    gradientColorStops('from-secondary', 'to-accent'),
    boxShadow('shadow-2xl', {
      'active:shadow-button-active': enabled,
      'hover:shadow-lg': enabled,
    })
  )
const innerButtonWrapper = classnames(
  width('w-full'),
  borderRadius('rounded-full'),
  backgroundColor('bg-primary-dark')
)

export default function ({
  children,
  disabled,
}: ChildrenProp & { disabled?: boolean }) {
  return (
    <div className={parentButtonWrapper(!disabled)}>
      <div className={innerButtonWrapper}>{children}</div>
    </div>
  )
}
