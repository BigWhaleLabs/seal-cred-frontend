import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  alignItems,
  display,
  flexDirection,
  height,
  space,
} from 'classnames/tailwind'

const container = classnames(
  space('space-y-6'),
  display('flex'),
  flexDirection('flex-col'),
  height('h-full'),
  alignItems('items-stretch')
)
export default function ({ children }: ChildrenProp) {
  return <div className={container}>{children}</div>
}
