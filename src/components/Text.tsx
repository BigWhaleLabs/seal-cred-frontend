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
import ChildrenProp from 'models/ChildrenProp'
import useBreakpoints from 'hooks/useBreakpoints'

const headerText = (accent = false, extraLeading = false, xs = false) =>
  classnames(
    fontFamily('font-primary'),
    fontWeight('font-bold'),
    fontSize(xs ? 'text-2xl' : 'text-3xl', 'sm:text-4xl'),
    textColor(accent ? 'text-accent' : 'text-formal-accent'),
    lineHeight(extraLeading ? 'leading-11' : 'leading-8')
  )
export function HeaderText({
  accent,
  extraLeading,
  children,
}: ChildrenProp & {
  accent?: boolean
  extraLeading?: boolean
}) {
  const { xs } = useBreakpoints()
  return <h1 className={headerText(accent, extraLeading, xs)}>{children}</h1>
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

const bodyText = (bold?: boolean, small?: boolean, center?: boolean) =>
  classnames(
    textColor('text-formal-accent'),
    textAlign(center ? 'text-center' : undefined),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    fontSize(small ? 'text-sm' : 'text-base'),
    lineHeight('leading-6')
  )
export function BodyText({
  bold,
  small,
  center,
  children,
}: ChildrenProp & {
  bold?: boolean
  small?: boolean
  center?: boolean
}) {
  return <p className={bodyText(bold, small, center)}>{children}</p>
}

const cardHeader = (color?: TTextColor) =>
  textColor(color || 'text-formal-accent')
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

const badgeText = (small?: boolean) =>
  classnames(
    textColor('text-formal-accent'),
    fontSize(small ? 'text-sm' : undefined)
  )
export function BadgeText({
  small,
  children,
}: ChildrenProp & { small?: boolean }) {
  return <span className={badgeText(small)}>{children}</span>
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
      target="_blank"
    >
      {children}
    </a>
  )
}

const highlightedText = (bold?: boolean, center?: boolean) =>
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

const sphereText = classnames(
  fontWeight('font-bold'),
  textColor('text-primary-dark'),
  textAlign('text-center')
)
export function SphereText({ children }: ChildrenProp) {
  return <p className={sphereText}>{children}</p>
}
