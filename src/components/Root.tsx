import { FC } from 'react'
import { MetaMaskProvider } from 'metamask-react'
import { classnames } from 'classnames/tailwind'
import ThemeProvider from 'components/ThemeProvider'

const root = classnames('container', 'mx-auto', 'pb-10', 'py-4')
const Root: FC = ({ children }) => {
  return (
    <ThemeProvider>
      <MetaMaskProvider>
        <div className={root}>{children}</div>
      </MetaMaskProvider>
    </ThemeProvider>
  )
}

export default Root
