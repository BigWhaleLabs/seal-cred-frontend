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

const parentButtonWrapper = classnames(
  width('w-fit'),
  borderRadius('rounded-full'),
  backgroundImage('bg-gradient-to-r'),
  padding('p-px'),
  gradientColorStops('from-secondary', 'to-accent'),
  boxShadow('shadow-2xl', 'hover:shadow-lg', 'active:shadow-button-active')
)
const innerButtonWrapper = classnames(
  width('w-full'),
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
