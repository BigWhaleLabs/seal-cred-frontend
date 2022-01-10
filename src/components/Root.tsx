import { FC } from 'react'
import { classnames, container, margin, padding } from 'classnames/tailwind'
import ThemeProvider from 'components/ThemeProvider'

const root = classnames(
  container('container'),
  margin('mx-auto'),
  padding('pb-10', 'py-4')
)
const Root: FC = ({ children }) => {
  return (
    <ThemeProvider>
      <div className={root}>{children}</div>
    </ThemeProvider>
  )
}

export default Root
