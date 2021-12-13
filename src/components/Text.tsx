import { FC } from 'react'
import { classnames } from 'classnames/tailwind'

const grayText = classnames('text-gray-300', 'transition-colors')

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

const bodyText = classnames(grayText, 'text-center')
export const BodyText: FC = ({ children }) => {
  return <p className={bodyText}>{children}</p>
}

const secondaryText = classnames(
  'font-primary',
  'font-normal',
  'text-sm',
  'text-primary-dimmed',
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
  'text-primary-dimmed',
  'transition-colors'
)
export const SubSecondaryText: FC = ({ children }) => (
  <div className={subSecondaryText}>{children}</div>
)

const secondarySubheaderText = (big: boolean) =>
  classnames(
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

const linkText = classnames('text-primary', 'transition-colors')
export const LinkText: FC<{ href?: string | undefined }> = ({
  children,
  href,
}) => (
  <a className={linkText} href={href}>
    {children}
  </a>
)
