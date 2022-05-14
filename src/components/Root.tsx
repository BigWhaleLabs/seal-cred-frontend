import { FC } from 'react'
import { classnames, margin, padding } from 'classnames/tailwind'

const root = classnames(margin('mx-auto'), padding('pb-10'))
const Root: FC = ({ children }) => {
  return <div className={root}>{children}</div>
}

export default Root
