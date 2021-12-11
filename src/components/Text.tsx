import { FC } from 'react'
import { classnames } from 'classnames/tailwind'

const grayText = classnames('text-gray-300', 'transition-colors')
const primaryText = classnames('text-primary', 'transition-colors')

const headerText = classnames(
  primaryText,
  'font-secondary',
  'text-3xl',
  'md:leading-10',
  'font-bold',
  'text-center'
)
export const HeaderText: FC = ({ children }) => {
  return <h1 className={headerText}>{children}</h1>
}

const subheaderText = classnames(
  primaryText,
  'font-secondary',
  'text-xl',
  'md:text-2xl',
  'font-bold',
  'text-center'
)
export const SubheaderText: FC = ({ children }) => {
  return <h2 className={subheaderText}>{children}</h2>
}

const bodyText = classnames(grayText, 'text-center')
export const BodyText: FC = ({ children }) => {
  return <p className={bodyText}>{children}</p>
}

const secondaryText = classnames(
  'font-primary',
  'font-normal',
  'text-sm',
  'text-primary-text-dimmed',
  'transition-colors'
)
export const SecondaryText: FC = ({ children }) => (
  <div className={secondaryText}>{children}</div>
)

const subSecondaryText = classnames(
  'font-primary',
  'font-normal',
  'text-base',
  'text-center',
  'text-primary-text-dimmed',
  'transition-colors'
)
export const SubSecondaryText: FC = ({ children }) => (
  <div className={subSecondaryText}>{children}</div>
)

const secondarySubheaderText = (big: boolean) =>
  classnames(
    primaryText,
    'font-bold',
    'font-secondary',
    big ? 'leading-8' : 'leading-6',
    big ? 'text-2xl' : 'text-lg'
  )
export const SecondarySubheaderText: FC<{ big?: boolean }> = ({
  big,
  children,
}) => {
  return <div className={secondarySubheaderText(big || false)}>{children}</div>
}

const regularText = classnames(
  'text-secondary',
  'transition-colors',
  'text-base',
  'font-normal'
)
export const RegularText: FC = ({ children }) => {
  return <div className={regularText}>{children}</div>
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

const badgeText = classnames(
  primaryText,
  'font-normal',
  'font-primary',
  'leading-6',
  'text-sm',
  'text-center',
  'max-w-xs',
  'truncate'
)
export const BadgeText: FC = ({ children }) => {
  return <span className={badgeText}>{children}</span>
}

const accentText = classnames(
  'text-accent',
  'font-bold',
  'font-primary',
  'leading-8',
  'text-base',
  'md:text-xl',
  'transition-colors'
)
export const AccentText: FC = ({ children }) => {
  return <h3 className={accentText}>{children}</h3>
}

const linkText = classnames('text-primary', 'transition-colors')
export const LinkText: FC<{ href?: string | undefined }> = ({
  children,
  href,
}) => (
  <a className={linkText} href={href}>
    {children}
  </a>
)
