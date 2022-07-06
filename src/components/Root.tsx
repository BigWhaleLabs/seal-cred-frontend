import { classnames, margin, padding } from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const root = classnames(margin('mx-auto'), padding('pb-10'))

export default function ({ children }: ChildrenProp) {
  return <div className={root}>{children}</div>
}
