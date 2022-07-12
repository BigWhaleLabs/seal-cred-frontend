import ChildrenProp from 'models/ChildrenProp'
import classnames, { padding, space } from 'classnames/tailwind'

const titleContainer = classnames(space('space-y-2'), padding('pb-3'))
export default function ({ children }: ChildrenProp) {
  return <div className={titleContainer}>{children}</div>
}
