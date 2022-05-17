import { ReactNode } from 'react'
import {
  TBackgroundColor,
  TGradientColorStops,
  TTextAlign,
  TTextColor,
  backgroundClip,
  backgroundColor,
  backgroundImage,
  borderRadius,
  classnames,
  fontFamily,
  fontSize,
  fontWeight,
  gradientColorStops,
  lineHeight,
  margin,
  overflow,
  padding,
  textAlign,
  textColor,
  textDecoration,
  textOverflow,
  whitespace,
  width,
  zIndex,
} from 'classnames/tailwind'
import Colors, { colorToTailwindBg } from 'models/Colors'

interface OnlyChildrenProp {
  children: ReactNode
}

type HeaderSize = '4xl' | '3xl' | '2xl'
const headerText = (size: HeaderSize, leading = 8, bold = true) =>
  classnames(
    fontFamily('font-primary'),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    fontSize(`text-${size}`),
    textColor('text-white'),
    lineHeight(leading === 11 ? 'leading-11' : 'leading-8')
  )
interface HeaderTextProps {
  size: HeaderSize
  children: ReactNode
  leading?: number
  bold?: boolean
}

export function HeaderText({ size, bold, leading, children }: HeaderTextProps) {
  return <h1 className={headerText(size, leading, bold)}>{children}</h1>
}

const subheaderText = classnames(
  textColor('text-primary'),
  fontFamily('font-primary')
)
export function SubheaderText({ children }: { children: ReactNode }) {
  return <h2 className={subheaderText}>{children}</h2>
}

interface AccentTextProps {
  color: TTextColor
  children: ReactNode
  align?: TTextAlign
  bold?: boolean
  small?: boolean
}
const accentText = ({ color, align, bold, small }: AccentTextProps) =>
  classnames(
    textColor(color),
    textAlign(align),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    fontSize(small ? 'text-sm' : undefined)
  )
export function AccentText(props: AccentTextProps) {
  return <span className={accentText(props)}>{props.children}</span>
}

export const textTruncateStyles = classnames(
  width('w-fit'),
  textOverflow('text-ellipsis'),
  overflow('overflow-hidden'),
  whitespace('whitespace-nowrap'),
  margin('mr-1')
)
type BodyTextSize = 'lg' | 'base' | 'sm' | 'xs'
const bodyText = (
  size: BodyTextSize,
  leading = 6,
  center?: boolean,
  overflow = false
) =>
  classnames(
    overflow ? textTruncateStyles : null,
    textColor('text-white'),
    center ? textAlign('text-center') : null,
    fontSize(`text-${size}`),
    lineHeight(leading === 6 ? 'leading-6' : 'leading-4')
  )
interface BodyTextProps {
  size: BodyTextSize
  children: ReactNode
  leading?: 3 | 4 | 5 | 6
  center?: boolean
  overflow?: boolean
}
export function BodyText({
  size,
  center,
  leading,
  overflow,
  children,
}: BodyTextProps) {
  return (
    <div className={bodyText(size, leading, center, overflow)}>{children}</div>
  )
}

const largerText = classnames(
  textColor('text-primary-dark'),
  fontSize('text-2xl')
)
export function LargerText({ children }: OnlyChildrenProp) {
  return <div className={largerText}>{children}</div>
}

const cardHeader = (color?: TTextColor) =>
  classnames(textColor(color || 'text-white'))
interface CardHeaderProps {
  children: ReactNode
  color?: TTextColor
}
export function CardHeader({ color, children }: CardHeaderProps) {
  return <div className={cardHeader(color)}>{children}</div>
}

const cardDescription = classnames(
  textColor('text-white'),
  fontSize('text-2xl'),
  fontFamily('font-primary'),
  fontWeight('font-bold')
)
export function CardDescription({ children }: OnlyChildrenProp) {
  return <div className={cardDescription}>{children}</div>
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

interface LinkTextProps {
  url: string
  children: ReactNode
  gradientFrom?: TGradientColorStops
  gradientTo?: TGradientColorStops
  color?: TTextColor
  title?: string
  bold?: boolean
  onClick?: () => void
}
const linkText = ({ gradientFrom, gradientTo, bold, color }: LinkTextProps) =>
  classnames(
    textDecoration('no-underline'),
    textColor(
      color
        ? color
        : gradientFrom || gradientTo
        ? 'text-transparent'
        : 'text-accent'
    ),
    backgroundImage(
      gradientFrom || gradientTo ? 'bg-gradient-to-r' : undefined
    ),
    backgroundClip(gradientFrom || gradientTo ? 'bg-clip-text' : undefined),
    gradientColorStops(gradientFrom, gradientTo),
    fontWeight(bold ? 'font-semibold' : 'font-normal')
  )
export function LinkText(props: LinkTextProps) {
  return (
    <a
      className={linkText(props)}
      href={props.url}
      title={props.title}
      rel="noopener noreferrer"
      target={'_blank'}
    >
      {props.children}
    </a>
  )
}

const subBadgeText = classnames(
  textColor('text-secondary'),
  fontSize('text-sm')
)
export function SubBadgeText({ children }: OnlyChildrenProp) {
  return <span className={subBadgeText}>{children}</span>
}

const boldColoredText = (color?: TTextColor) =>
  classnames(
    textColor('text-secondary'),
    fontSize('text-sm'),
    textColor(color || 'text-primary-dark')
  )
interface BoldColoredTextProps {
  children: ReactNode
  color?: TTextColor
}
export function BoldColoredText({ color, children }: BoldColoredTextProps) {
  return <span className={boldColoredText(color)}>{children}</span>
}

const tooltipText = classnames(
  fontWeight('font-bold'),
  textColor('text-primary-dark'),
  fontFamily('font-primary')
)
export function TooltipText({ children }: OnlyChildrenProp) {
  return <div className={tooltipText}>{children}</div>
}

const highlightedText = (
  bgColor: TBackgroundColor,
  center?: boolean,
  bold?: boolean,
  onlyWrap?: boolean
) =>
  classnames(
    textColor('text-primary-dark'),
    fontWeight(bold ? 'font-bold' : 'font-medium'),
    fontSize('text-sm'),
    borderRadius('rounded-full'),
    backgroundColor(bgColor),
    width('w-fit'),
    padding(onlyWrap ? 'px-2' : 'px-4', 'py-1'),
    textAlign(center ? 'text-center' : 'text-left'),
    zIndex('z-10')
  )
interface HighlightedTextProps {
  children: ReactNode
  center?: boolean
  color?: Colors
  bold?: boolean
  onlyWrap?: boolean
}
export function HighlightedText({
  children,
  center,
  color,
  bold,
  onlyWrap,
}: HighlightedTextProps) {
  const bgColor = colorToTailwindBg(color)

  return (
    <div className={highlightedText(bgColor, center, bold, onlyWrap)}>
      {children}
    </div>
  )
}
