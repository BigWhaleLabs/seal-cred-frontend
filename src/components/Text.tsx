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

interface ChildrenProp {
  children: ReactNode
}

const headerText = (extraLeading = false) =>
  classnames(
    fontFamily('font-primary'),
    fontWeight('font-bold'),
    fontSize('text-4xl'),
    textColor('text-formal-accent'),
    lineHeight(extraLeading ? 'leading-11' : 'leading-8')
  )
export function HeaderText({
  extraLeading,
  children,
}: ChildrenProp & {
  extraLeading?: boolean
}) {
  return <h1 className={headerText(extraLeading)}>{children}</h1>
}

const subheaderText = classnames(
  textColor('text-primary'),
  fontFamily('font-primary')
)
export function SubheaderText({ children }: ChildrenProp) {
  return <h2 className={subheaderText}>{children}</h2>
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
}: ChildrenProp & {
  color: TTextColor
  bold?: boolean
  small?: boolean
  primary?: boolean
}) {
  return (
    <span className={accentText(color, bold, small, primary)}>{children}</span>
  )
}

const bodyText = (small?: boolean, center?: boolean) =>
  classnames(
    textColor('text-formal-accent'),
    textAlign(center ? 'text-center' : undefined),
    fontSize(small ? 'text-sm' : 'text-base'),
    lineHeight('leading-6')
  )
export function BodyText({
  small,
  center,
  children,
}: ChildrenProp & {
  small?: boolean
  center?: boolean
}) {
  return <p className={bodyText(small, center)}>{children}</p>
}

const cardHeader = (color?: TTextColor) =>
  classnames(textColor(color || 'text-formal-accent'))
export function CardHeader({
  color,
  children,
}: ChildrenProp & {
  color?: TTextColor
}) {
  return <h3 className={cardHeader(color)}>{children}</h3>
}

const cardDescription = classnames(
  textColor('text-formal-accent'),
  fontSize('text-2xl'),
  fontFamily('font-primary'),
  fontWeight('font-bold')
)
export function CardDescription({ children }: ChildrenProp) {
  return <p className={cardDescription}>{children}</p>
}

const logoText = classnames(
  textColor('text-accent'),
  fontWeight('font-bold'),
  fontSize('text-xl')
)
export function LogoText({ children }: ChildrenProp) {
  return <span className={logoText}>{children}</span>
}

const badgeText = classnames(
  textColor('text-formal-accent'),
  fontSize('text-sm'),
  lineHeight('leading-6')
)
export function BadgeText({ children }: ChildrenProp) {
  return <span className={badgeText}>{children}</span>
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
}: ChildrenProp & {
  url: string
  bold?: boolean
  title?: string
  color?: TTextColor
  gradientFrom?: TGradientColorStops
  gradientTo?: TGradientColorStops
}) {
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
}: ChildrenProp & {
  bold?: boolean
  center?: boolean
}) {
  return <div className={highlightedText(bold, center)}>{children}</div>
}
