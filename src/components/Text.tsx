import { FC } from 'react'
import {
  TFontSize,
  TGradientColorStops,
  TTextAlign,
  TTextColor,
  backgroundImage,
  classnames,
  fontFamily,
  fontSize,
  fontWeight,
  gradientColorStops,
  textAlign,
  textColor,
  textDecoration,
} from 'classnames/tailwind'

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

interface AccentTextProps {
  color: TTextColor
  align?: TTextAlign
  size?: TFontSize
  bold?: boolean
}
const accentText = ({ color, align, bold, size }: AccentTextProps) =>
  classnames(
    textColor(color),
    textAlign(align),
    fontFamily('font-primary'),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    fontSize(size)
  )
export const AccentText: FC<AccentTextProps> = (props) => {
  return <span className={accentText(props)}>{props.children}</span>
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

interface LinkTextProps {
  url: string
  gradient?: TGradientColorStops
  bold?: boolean
  onClick?: () => void
}
const linkText = ({ gradient, bold }: LinkTextProps) =>
  classnames(
    textDecoration('no-underline'),
    textColor(gradient ? 'text-transparent' : 'text-yellow'),
    backgroundImage(gradient ? 'bg-gradient-to-r' : undefined),
    gradientColorStops(gradient),
    fontWeight(bold ? 'font-bold' : 'font-normal')
  )
export const LinkText: FC<LinkTextProps> = (props) => {
  return (
    <a
      className={linkText(props)}
      href={props.url}
      rel="noopener noreferrer"
      target={'_blank'}
    >
      {props.children}
    </a>
  )
}

const subBadgeText = classnames(textColor('text-pink'), fontSize('text-sm'))
export const SubBadgeText: FC = ({ children }) => {
  return <span className={subBadgeText}>{children}</span>
}

const tooltipText = classnames(
  fontWeight('font-bold'),
  textColor('text-blue-900'),
  fontFamily('font-primary')
)
export const TooltipText: FC = ({ children }) => {
  return <div className={tooltipText}>{children}</div>
}
