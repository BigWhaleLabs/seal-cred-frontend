import ChildrenProp from 'models/ChildrenProp'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-2')
)

export default function ({ children }: ChildrenProp) {
  return <div className={container}>{children}</div>
}
