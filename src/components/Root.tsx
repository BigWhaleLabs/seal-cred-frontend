import { classnames, margin, padding, space } from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const root = classnames(
  margin('mx-auto'),
  padding('pb-10'),
  space('space-y-6', 'sm:space-y-10')
)

export default function ({ children }: ChildrenProp) {
  return <div className={root}>{children}</div>
}
