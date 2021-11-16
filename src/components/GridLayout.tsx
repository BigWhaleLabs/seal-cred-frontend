import { FC } from 'react'
import { classnames } from 'classnames/tailwind'

const gridLayout = classnames(
  'grid',
  'md:flex',
  'grid-cols-1',
  'md:grid-cols-3',
  'gap-4',
  'md:gap-8'
)

const GridLayout: FC = ({ children }) => {
  return <div className={gridLayout}>{children}</div>
}

export default GridLayout
