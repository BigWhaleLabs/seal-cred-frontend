import { FC } from 'react'
import { classnames } from 'classnames/tailwind'
import { observer } from 'mobx-react-lite'
import appStore from 'stores/AppStore'

const ThemeProvider: FC = ({ children }) => {
  const backgroundStyle = classnames(
    'bg-background',
    'h-screen',
    'transition-colors'
  )
  const root = window.document.documentElement
  root.classList.remove(appStore.theme === 'dark' ? 'light' : 'dark')
  root.classList.add(appStore.theme)
  return (
    <div className={`${appStore.theme} ${backgroundStyle}`}>{children}</div>
  )
}

export default observer(ThemeProvider)
