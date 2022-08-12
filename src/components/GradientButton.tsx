import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  backgroundColor,
  backgroundImage,
  borderRadius,
  boxShadow,
  gradientColorStops,
  padding,
} from 'classnames/tailwind'

const parentButtonWrapper = classnames(
  borderRadius('rounded-full'),
  backgroundImage('bg-gradient-to-r'),
  padding('p-px'),
  gradientColorStops('from-secondary', 'to-accent'),
  boxShadow('shadow-2xl', 'hover:shadow-lg', 'active:shadow-button-active')
)
const innerButtonWrapper = classnames(
  borderRadius('rounded-full'),
  backgroundColor('bg-primary-dark')
)

export default function ({ children }: ChildrenProp) {
  return (
    <div className={parentButtonWrapper}>
      <div className={innerButtonWrapper}>{children}</div>
    </div>
  )
}
