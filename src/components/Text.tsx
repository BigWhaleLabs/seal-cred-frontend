import { ReactNode } from 'react'
import {
  TGradientColorStops,
  TTextColor,
  backgroundClip,
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
  width,
} from 'classnames/tailwind'
import Colors from 'models/Colors'

interface OnlyChildrenProp {
  children: ReactNode
}

const headerText = (leading = false) =>
  classnames(
    fontFamily('font-primary'),
    fontWeight('font-bold'),
    fontSize('text-4xl'),
    textColor('text-white'),
    lineHeight(leading ? 'leading-11' : 'leading-8')
  )
interface HeaderTextProps extends OnlyChildrenProp {
  leading?: boolean
}

export function HeaderText({ leading, children }: HeaderTextProps) {
  return <h1 className={headerText(leading)}>{children}</h1>
}

const subheaderText = classnames(
  textColor('text-primary'),
  fontFamily('font-primary')
)
export function SubheaderText({ children }: OnlyChildrenProp) {
  return <h2 className={subheaderText}>{children}</h2>
}

interface AccentTextProps extends OnlyChildrenProp {
  color: TTextColor
  bold?: boolean
  small?: boolean
  primary?: boolean
}
const accentText = (
  color: TTextColor,
  bold?: boolean,
  small?: boolean,
  primary?: boolean
) =>
  classnames(
    textColor(color),
    fontFamily(primary ? 'font-primary' : undefined),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    fontSize(small ? 'text-sm' : undefined)
  )
export function AccentText({
  color,
  bold,
  small,
  primary,
  children,
}: AccentTextProps) {
  return (
    <span className={accentText(color, bold, small, primary)}>{children}</span>
  )
}

interface BodyTextProps extends OnlyChildrenProp {
  small?: boolean
  center?: boolean
}
const bodyText = (small?: boolean, center?: boolean) =>
  classnames(
    textColor('text-white'),
    textAlign(center ? 'text-center' : undefined),
    fontSize(small ? 'text-sm' : 'text-base'),
    lineHeight('leading-6')
  )
export function BodyText({ small, center, children }: BodyTextProps) {
  return <p className={bodyText(small, center)}>{children}</p>
}

interface CardHeaderProps extends OnlyChildrenProp {
  color?: TTextColor
}
const cardHeader = (color?: TTextColor) =>
  classnames(textColor(color || 'text-white'))
export function CardHeader({ color, children }: CardHeaderProps) {
  return <h3 className={cardHeader(color)}>{children}</h3>
}

const cardDescription = classnames(
  textColor('text-white'),
  fontSize('text-2xl'),
  fontFamily('font-primary'),
  fontWeight('font-bold')
)
export function CardDescription({ children }: OnlyChildrenProp) {
  return <p className={cardDescription}>{children}</p>
}

const logoText = classnames(
  textColor('text-accent'),
  fontWeight('font-bold'),
  fontSize('text-xl')
)
export function LogoText({ children }: OnlyChildrenProp) {
  return <span className={logoText}>{children}</span>
}

const badgeText = textColor('text-white')
export function BadgeText({ children }: OnlyChildrenProp) {
  return <span className={badgeText}>{children}</span>
}

interface LinkTextProps extends OnlyChildrenProp {
  url: string
  bold?: boolean
  title?: string
  color?: TTextColor
  gradientFrom?: TGradientColorStops
  gradientTo?: TGradientColorStops
}
const linkText = (
  bold?: boolean,
  color?: TTextColor,
  gradientFrom?: TGradientColorStops,
  gradientTo?: TGradientColorStops
) =>
  classnames(
    textDecoration('no-underline'),
    textColor(
      gradientFrom && gradientTo ? 'text-transparent' : color || 'text-accent'
    ),
    backgroundImage(
      gradientFrom && gradientTo ? 'bg-gradient-to-r' : undefined
    ),
    backgroundClip(gradientFrom && gradientTo ? 'bg-clip-text' : undefined),
    gradientColorStops(gradientFrom, gradientTo),
    fontWeight(bold ? 'font-semibold' : 'font-normal')
  )
export function LinkText({
  url,
  bold,
  title,
  color,
  gradientFrom,
  gradientTo,
  children,
}: LinkTextProps) {
  return (
    <a
      className={linkText(bold, color, gradientFrom, gradientTo)}
      href={url}
      title={title}
      rel="noopener noreferrer"
      target={'_blank'}
    >
      {children}
    </a>
  )
}

interface HighlightedTextProps extends OnlyChildrenProp {
  bold?: boolean
  center?: boolean
  onlyWrap?: boolean
  color?: Colors
}
const highlightedText = (center?: boolean, bold?: boolean) =>
  classnames(
    width('w-fit'),
    textColor('text-primary-dark'),
    fontWeight(bold ? 'font-bold' : 'font-semibold'),
    fontFamily(bold ? 'font-primary' : undefined),
    fontSize(bold ? 'text-base' : 'text-sm'),
    lineHeight(bold ? 'leading-6' : 'leading-5'),
    textAlign(center ? 'text-center' : 'text-left')
  )
export function HighlightedText({
  bold,
  center,
  children,
}: HighlightedTextProps) {
  return <div className={highlightedText(bold, center)}>{children}</div>
}
