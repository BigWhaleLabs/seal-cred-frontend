import { FC } from 'react'
import {
  classnames,
  fontFamily,
  fontSize,
  fontWeight,
  textAlign,
  textColor,
  textDecoration,
  wordBreak,
} from 'classnames/tailwind'

type TextColor = 'pink' | 'yellow' | 'blue'

const headerText = classnames(
  fontFamily('font-primary'),
  fontWeight('font-bold'),
  fontSize('text-4xl'),
  textColor('text-white')
)
export const HeaderText: FC = ({ children }) => {
  return <h1 className={headerText}>{children}</h1>
}

const subheaderText = classnames(
  textColor('text-blue-500'),
  fontFamily('font-primary')
)
export const SubheaderText: FC = ({ children }) => {
  return <h2 className={subheaderText}>{children}</h2>
}

const accentText = (active?: boolean) =>
  classnames(
    textColor(active ? 'text-yellow' : 'text-blue-600'),
    wordBreak(active ? 'break-all' : undefined),
    textAlign('text-center'),
    fontFamily('font-primary'),
    fontWeight('font-bold'),
    fontSize('text-sm')
  )
export const AccentText: FC<{ active?: boolean }> = ({ active, children }) => {
  return <span className={accentText(active)}>{children}</span>
}

const bodyText = (center: boolean) =>
  classnames(textColor('text-white'), center ? textAlign('text-center') : null)
export const BodyText: FC<{ center?: boolean }> = ({ center, children }) => {
  return <div className={bodyText(center || false)}>{children}</div>
}

const largerText = classnames(textColor('text-blue-900'), fontSize('text-2xl'))
export const LargerText: FC = ({ children }) => {
  return <div className={largerText}>{children}</div>
}

const cardHeader = classnames(textColor('text-pink'), fontSize('text-base'))
export const CardHeader: FC = ({ children }) => {
  return <div className={cardHeader}>{children}</div>
}

const subHeaderDescription = classnames(
  textColor('text-white'),
  fontSize('text-2xl'),
  fontFamily('font-primary'),
  fontWeight('font-bold')
)
export const SubHeaderDescription: FC = ({ children }) => {
  return <div className={subHeaderDescription}>{children}</div>
}

const logoText = classnames(
  textColor('text-yellow'),
  fontWeight('font-bold'),
  fontSize('text-xl')
)
export const LogoText: FC = ({ children }) => {
  return <span className={logoText}>{children}</span>
}

const badgeText = classnames(textColor('text-white'))
export const BadgeText: FC = ({ children }) => {
  return <span className={badgeText}>{children}</span>
}

const link = classnames(
  textDecoration('underline'),
  textColor('text-yellow', 'hover:text-orange'),
  fontWeight('font-bold')
)
export const Link: FC<{ url: string; onClick?: () => void }> = ({
  children,
  url,
  onClick,
}) => {
  return (
    <a
      className={link}
      href={url}
      rel="noopener noreferrer"
      target={onClick ? '' : '_blank'}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

const popupBodyText = classnames(
  textColor('text-white'),
  textAlign('text-center')
)
export const PopupBodyText: FC = ({ children }) => {
  return <div className={popupBodyText}>{children}</div>
}

const subBadgeText = classnames(textColor('text-pink'), fontSize('text-sm'))
export const SubBadgeText: FC = ({ children }) => {
  return <span className={subBadgeText}>{children}</span>
}

const boldColoredText = (color?: TextColor) =>
  classnames(
    textColor('text-pink'),
    fontSize('text-sm'),
    textColor(
      color === 'pink'
        ? 'text-pink'
        : color === 'yellow'
        ? 'text-yellow'
        : 'text-blue-900'
    )
  )
export const BoldColoredText: FC<{ color?: TextColor }> = ({
  color,
  children,
}) => {
  return <span className={boldColoredText(color)}>{children}</span>
}

const tooltipText = classnames(
  fontWeight('font-bold'),
  textColor('text-blue-900'),
  fontFamily('font-primary')
)
export const TooltipText: FC = ({ children }) => {
  return <div className={tooltipText}>{children}</div>
}
