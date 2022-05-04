import {
  AccentTextProps,
  BodyTextSize,
  HeaderSize,
  LinkTextProps,
} from 'types/TextProps'
import { FC } from 'react'
import {
  TTextColor,
  backgroundImage,
  classnames,
  fontFamily,
  fontSize,
  fontWeight,
  gradientColorStops,
  lineHeight,
  textAlign,
  textColor,
  textDecoration,
} from 'classnames/tailwind'

const headerText = (size: HeaderSize, bold = true) =>
  classnames(
    fontFamily('font-primary'),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    fontSize(
      `md:text-${size}`,
      size === '4xl' ? 'text-3xl' : size === '3xl' ? 'text-2xl' : 'text-xl'
    ),
    textColor('text-white'),
    lineHeight('leading-7')
  )
export const HeaderText: FC<{ size: HeaderSize; bold?: boolean }> = ({
  size,
  bold,
  children,
}) => {
  return <h1 className={headerText(size, bold)}>{children}</h1>
}

const subheaderText = classnames(
  textColor('text-blue-500'),
  fontFamily('font-primary')
)
export const SubheaderText: FC = ({ children }) => {
  return <h2 className={subheaderText}>{children}</h2>
}

const accentText = ({ color, align, bold }: AccentTextProps) =>
  classnames(
    textColor(color),
    textAlign(align),
    fontFamily('font-primary'),
    fontWeight(bold ? 'font-bold' : 'font-normal')
  )
export const AccentText: FC<AccentTextProps> = (props) => {
  return <span className={accentText(props)}>{props.children}</span>
}

const bodyText = (size: BodyTextSize, center?: boolean) =>
  classnames(
    textColor('text-white'),
    center ? textAlign('text-center') : null,
    fontSize(`text-${size}`),
    lineHeight('leading-4')
  )
export const BodyText: FC<{ size: BodyTextSize; center?: boolean }> = ({
  size,
  center,
  children,
}) => {
  return <div className={bodyText(size, center)}>{children}</div>
}

const largerText = classnames(textColor('text-blue-900'), fontSize('text-2xl'))
export const LargerText: FC = ({ children }) => {
  return <div className={largerText}>{children}</div>
}

const cardHeader = (color?: TTextColor) =>
  classnames(textColor(color || 'text-white'))
export const CardHeader: FC<{ color?: TTextColor }> = ({ color, children }) => {
  return <div className={cardHeader(color)}>{children}</div>
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

const boldColoredText = (color?: TTextColor) =>
  classnames(
    textColor('text-pink'),
    fontSize('text-sm'),
    textColor(color || 'text-blue-900')
  )
export const BoldColoredText: FC<{ color?: TTextColor }> = ({
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
