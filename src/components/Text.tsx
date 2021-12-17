import { FC } from 'react'
import { classnames } from 'classnames/tailwind'

const headerText = classnames(
  'transition-colors',
  'text-primary',
  'font-primary',
  'font-bold',
  'text-2xl',
  'text-center'
)
export const HeaderText: FC = ({ children }) => {
  return <h1 className={headerText}>{children}</h1>
}

const subheaderText = classnames(
  'transition-colors',
  'text-primary-dimmed',
  'font-primary'
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

const bodyText = classnames('transition-colors', 'text-primary')
export const BodyText: FC = ({ children }) => {
  return <div className={bodyText}>{children}</div>
}

const largerText = classnames('transition-colors', 'text-primary', 'text-2xl')
export const LargerText: FC = ({ children }) => {
  return <div className={largerText}>{children}</div>
}

const logoText = classnames(
  'font-secondary',
  'font-bold',
  'text-primary',
  'transition-colors',
  'text-xl'
)
export const LogoText: FC = ({ children }) => {
  return <span className={logoText}>{children}</span>
}

const badgeText = classnames(
  'font-secondary',
  'text-primary',
  'transition-colors'
)
export const BadgeText: FC = ({ children }) => {
  return <span className={badgeText}>{children}</span>
}

const link = classnames('font-bold', 'underline', 'text-accent')
export const Link: FC<{ url: string }> = ({ children, url }) => {
  return (
    <a className={link} href={url} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  )
}
