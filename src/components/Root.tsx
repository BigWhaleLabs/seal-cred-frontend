Йimport { FC } from 'react'
import {
  classnames,
  container,
  margin,
  maxWidth,
  padding,
} from 'classnames/tailwind'

const root = classnames(
  container('container'),
  margin('mx-auto'),
  padding('pb-10', 'pt-4'),
  maxWidth('max-w-md')
)
const Root: FC = ({ children }) => {
  return <div className={root}>{children}</div>
}

export default Root
