import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  alignItems,
  display,
  height,
  inset,
  justifyContent,
  position,
} from 'classnames/tailwind'

const centeredContainer = classnames(
  position('absolute'),
  inset('top-0', 'left-0', 'right-0', 'bottom-0'),
  display('flex'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  height('h-screen')
)

export default function ({ children }: ChildrenProp) {
  return <div className={centeredContainer}>{children}</div>
}
