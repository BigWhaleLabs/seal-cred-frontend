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
  margin,
  textAlign,
  textColor,
  textDecoration,
  width,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'
import Color from 'models/Color'
import colorToTextColor from 'helpers/colorToTextColor'
import useBreakpoints from 'hooks/useBreakpoints'

const headerText = (accent = false, extraLeading = false, xs = false) =>
  classnames(
    fontFamily('font-primary'),
    fontWeight('font-bold'),
    fontSize(xs ? 'text-2xl' : 'text-3xl', 'sm:text-4xl'),
    textColor(accent ? 'text-accent' : 'text-formal-accent'),
    extraLeading
      ? lineHeight('leading-9', 'sm:leading-10', 'md:leading-11')
      : lineHeight('leading-8')
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
    fontSize(small ? 'text-sm' : 'text-sm', 'sm:text-base'),
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

const proofText = classnames(
  textColor('text-formal-accent'),
  fontSize('text-sm'),
  lineHeight('leading-5'),
  fontWeight('font-bold')
)
export function ProofText({ children }: ChildrenProp) {
  return <p className={proofText}>{children}</p>
}

export function CardHeader({
  color = 'formal-accent',
  children,
}: ChildrenProp & {
  color?: Color
}) {
  return <h3 className={colorToTextColor(color)}>{children}</h3>
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
  fontSize('text-lg'),
  lineHeight('leading-none')
)
export function LogoText({ children }: ChildrenProp) {
  return <span className={logoText}>{children}</span>
}
const logoSubText = classnames(
  textColor('text-primary-semi-dimmed'),
  fontWeight('font-bold'),
  fontSize('text-xs')
)
export function LogoSubText({ children }: ChildrenProp) {
  return <span className={logoSubText}>{children}</span>
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
    fontWeight(bold ? 'font-bold' : 'font-normal')
  )

export function GradientSpan({
  children,
  bold,
  color,
  gradientFrom,
  gradientTo,
}: ChildrenProp & {
  bold?: boolean
  color?: TTextColor
  gradientFrom?: TGradientColorStops
  gradientTo?: TGradientColorStops
}) {
  return (
    <span className={linkText(bold, color, gradientFrom, gradientTo)}>
      {children}
    </span>
  )
}

export function LinkText({
  url,
  bold,
  title,
  color,
  gradientFrom,
  gradientTo,
  children,
  targetBlank,
}: ChildrenProp & {
  url: string
  targetBlank?: boolean
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
      target={targetBlank ? '_blank' : '_self'}
    >
      {children}
    </a>
  )
}

const hintText = (bold?: boolean, center?: boolean) =>
  classnames(
    fontSize('text-sm'),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    textAlign(center ? 'text-center' : 'text-left')
  )
export function HintText({
  bold,
  center,
  children,
}: ChildrenProp & {
  bold?: boolean
  center?: boolean
}) {
  return <div className={hintText(bold, center)}>{children}</div>
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

const proofSectionTitle = classnames(
  fontWeight('font-bold'),
  margin('mb-2'),
  fontSize('text-sm')
)
export function ProofSectionTitle({ children }: ChildrenProp) {
  return <p className={proofSectionTitle}>{children}</p>
}

const tinyText = (color: 'base' | 'primary' | 'error') =>
  classnames(
    textColor(
      color === 'error'
        ? 'text-error'
        : color === 'primary'
        ? 'text-primary-semi-dimmed'
        : 'text-formal-accent'
    ),
    fontFamily('font-primary'),
    fontSize('text-xs'),
    lineHeight('leading-3')
  )
export function TinyText({
  color,
  children,
}: { color?: 'base' | 'primary' | 'error' } & ChildrenProp) {
  return <span className={tinyText(color || 'base')}>{children}</span>
}
