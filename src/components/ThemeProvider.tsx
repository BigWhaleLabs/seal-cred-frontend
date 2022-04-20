import { FC } from 'react'
import {
  backgroundColor,
  classnames,
  height,
  minHeight,
  transitionProperty,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'

const ThemeProvider: FC = ({ children }) => {
  const { theme } = useSnapshot(AppStore)
  const backgroundStyle = classnames(
    backgroundColor('bg-background'),
    height('h-full'),
    minHeight('min-h-screen'),
    transitionProperty('transition-colors')
  )
  const root = window.document.documentElement
  root.classList.remove(theme === 'dark' ? 'light' : 'dark')
  root.classList.add(theme)
  return <div className={`${theme} ${backgroundStyle}`}>{children}</div>
}

export default ThemeProvider
