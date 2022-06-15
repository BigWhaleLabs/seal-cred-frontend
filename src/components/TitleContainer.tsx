import { space } from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const titleContainer = space('space-y-2')
export default function ({ children }: ChildrenProp) {
  return <div className={titleContainer}>{children}</div>
}
