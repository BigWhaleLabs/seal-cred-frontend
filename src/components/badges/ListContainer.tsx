import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  alignItems,
  display,
  flexDirection,
  height,
  space,
} from 'classnames/tailwind'

const badgesContainer = classnames(
  space('space-y-6'),
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-stretch'),
  height('h-full')
)
export default function ({ children }: ChildrenProp) {
  return <div className={badgesContainer}>{children}</div>
}
