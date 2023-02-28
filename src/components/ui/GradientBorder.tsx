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
      'hover:shadow-lg': enabled,
      'active:shadow-button-active': enabled,
    })
  )
const innerButtonWrapper = classnames(
  width('w-full'),
  borderRadius('rounded-full'),
  backgroundColor('bg-primary-dark')
)

export default function ({
  disabled,
  children,
}: ChildrenProp & { disabled?: boolean }) {
  return (
    <div className={parentButtonWrapper(!disabled)}>
      <div className={innerButtonWrapper}>{children}</div>
    </div>
  )
}
