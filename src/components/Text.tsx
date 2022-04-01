import { FC } from 'react'
import {
  classnames,
  fontFamily,
  fontSize,
  fontWeight,
  textAlign,
  textColor,
  textDecoration,
  transitionProperty,
} from 'classnames/tailwind'

const headerText = classnames(
  transitionProperty('transition-colors'),
  textColor('text-primary'),
  textAlign('text-center'),
  fontFamily('font-primary'),
  fontWeight('font-bold'),
  fontSize('text-2xl')
)
export const HeaderText: FC = ({ children }) => {
  return <h1 className={headerText}>{children}</h1>
}

const subheaderText = classnames(
  transitionProperty('transition-colors'),
  textColor('text-primary-dimmed'),
  fontFamily('font-primary')
)
export const SubheaderText: FC = ({ children }) => {
  return <h2 className={subheaderText}>{children}</h2>
}

const accentText = classnames(
  transitionProperty('transition-colors'),
  textColor('text-accent'),
  fontFamily('font-primary'),
  fontWeight('font-bold')
)
export const AccentText: FC = ({ children }) => {
  return <span className={accentText}>{children}</span>
}

const bodyText = classnames(
  transitionProperty('transition-colors'),
  textColor('text-primary')
)
export const BodyText: FC = ({ children }) => {
  return <div className={bodyText}>{children}</div>
}

const largerText = classnames(
  transitionProperty('transition-colors'),
  textColor('text-primary'),
  fontSize('text-2xl')
)
export const LargerText: FC = ({ children }) => {
  return <div className={largerText}>{children}</div>
}

const logoText = classnames(
  transitionProperty('transition-colors'),
  textColor('text-primary'),
  fontFamily('font-secondary'),
  fontWeight('font-bold'),
  fontSize('text-xl')
)
export const LogoText: FC = ({ children }) => {
  return <span className={logoText}>{children}</span>
}

const badgeText = classnames(
  transitionProperty('transition-colors'),
  textColor('text-primary'),
  fontFamily('font-secondary')
)
export const BadgeText: FC = ({ children }) => {
  return <span className={badgeText}>{children}</span>
}

const link = classnames(
  textDecoration('underline'),
  textColor('text-accent'),
  fontWeight('font-bold')
)
export const Link: FC<{ url: string }> = ({ children, url }) => {
  return (
    <a className={link} href={url} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  )
}

const popupBodyText = classnames(
  transitionProperty('transition-colors'),
  textColor('text-primary'),
  textAlign('text-center')
)
export const PopupBodyText: FC = ({ children }) => {
  return <div className={popupBodyText}>{children}</div>
}

const errorText = classnames(
  textColor('text-error'),
  fontWeight('font-medium'),
  fontFamily('font-primary'),
  transitionProperty('transition-colors')
)
export const ErrorText: FC = ({ children }) => (
  <p className={errorText}>{children}</p>
)

const subBadgeText = classnames(
  transitionProperty('transition-colors'),
  textColor('text-primary'),
  fontSize('text-sm')
)
export const SubBadgeText: FC = ({ children }) => {
  return <span className={subBadgeText}>{children}</span>
}
