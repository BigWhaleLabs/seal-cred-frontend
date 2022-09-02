import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  alignItems,
  display,
  flexDirection,
  width,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col-reverse', 'lg:flex-col'),
  alignItems('items-center'),
  width('w-full', 'tablet:w-fit')
)
export default function ({ children }: ChildrenProp) {
  return <div className={container}>{children}</div>
}
