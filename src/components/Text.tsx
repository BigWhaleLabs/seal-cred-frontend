import { FC } from 'react'
import { classnames } from 'classnames/tailwind'

const headerText = classnames(
  'transition-colors',
  'text-primary',
  'font-primary',
  'font-bold',
  'text-2xl',
  'text-center',
  'mt-2',
  'mb-6'
)
export const HeaderText: FC = ({ children }) => {
  return <h1 className={headerText}>{children}</h1>
}

const subheaderText = classnames(
  'transition-colors',
  'text-primary-dimmed',
  'font-primary',
  'mb-4'
)
export const SubheaderText: FC = ({ children }) => {
  return <h2 className={subheaderText}>{children}</h2>
}

const accentText = classnames(
  'transition-colors',
  'text-accent',
  'font-primary',
  'font-bold'
)
export const AccentText: FC = ({ children }) => {
  return <span className={accentText}>{children}</span>
}

const bodyText = classnames('transition-colors', 'text-primary', 'mb-2')
export const BodyText: FC = ({ children }) => {
  return <div className={bodyText}>{children}</div>
}

const largerText = classnames(
  'transition-colors',
  'text-primary',
  'text-2xl',
  'mb-2'
)
export const LargerText: FC = ({ children }) => {
  return <div className={largerText}>{children}</div>
}

const logoText = classnames(
  'font-secondary',
  'font-bold',
  'text-primary',
  'transition-colors',
  'leading-8',
  'text-xl'
)
export const LogoText: FC = ({ children }) => {
  return <span className={logoText}>{children}</span>
}
