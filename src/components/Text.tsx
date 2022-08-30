import { NavLink } from 'react-router-dom'
import {
  TDropShadow,
  TGradientColorStops,
  TTextColor,
  backgroundClip,
  backgroundImage,
  classnames,
  dropShadow,
  fontFamily,
  fontSize,
  fontWeight,
  gradientColorStops,
  lineHeight,
  opacity,
  textAlign,
  textColor,
  textDecoration,
  textTransform,
  transitionProperty,
  width,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'
import Color from 'models/Color'
import classNamesToString from 'helpers/classNamesToString'
import colorToTextColor from 'helpers/colors/colorToTextColor'

const headerText = (accent = false, extraLeading = false) =>
  classnames(
    fontFamily('font-primary'),
    fontWeight('font-bold'),
    fontSize('text-2xl', 'xs:text-3xl', 'sm:text-4xl'),
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
  return <h1 className={headerText(accent, extraLeading)}>{children}</h1>
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
  primary?: boolean,
  shadow?: TDropShadow,
  extraSmall?: boolean
) =>
  classnames(
    textColor(
      color === 'text-primary-semi-dimmed'
        ? { 'selection:text-primary': true, 'text-primary-semi-dimmed': true }
        : color
    ),
    fontFamily(primary ? 'font-primary' : undefined),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    fontSize({
      'text-sm': small,
      'text-xs': extraSmall,
      'sm:text-base': extraSmall,
    }),
    dropShadow(shadow)
  )
export function AccentText({
  color,
  bold,
  small,
  primary,
  shadow,
  children,
  extraSmall,
}: ChildrenProp & {
  color: TTextColor
  bold?: boolean
  small?: boolean
  primary?: boolean
  shadow?: TDropShadow
  extraSmall?: boolean
}) {
  return (
    <span
      className={accentText(color, bold, small, primary, shadow, extraSmall)}
    >
      {children}
    </span>
  )
}

const bodyText = (
  bold?: boolean,
  small?: boolean,
  smallOnBig?: boolean,
  center?: boolean,
  color?: TTextColor,
  fontPrimary?: boolean
) =>
  classnames(
    fontFamily({ 'font-primary': fontPrimary }),
    textColor(color ? color : 'text-formal-accent'),
    textAlign({ 'text-center': center }),
    fontWeight({ 'font-bold': bold }),
    fontSize(small ? 'text-xs' : 'text-sm', { 'sm:text-base': !smallOnBig }),
    lineHeight('leading-6')
  )
export function BodyText({
  bold,
  small,
  smallOnBig,
  center,
  children,
  color,
  fontPrimary,
}: ChildrenProp & {
  bold?: boolean
  small?: boolean
  smallOnBig?: boolean
  center?: boolean
  color?: TTextColor
  fontPrimary?: boolean
}) {
  return (
    <p
      className={bodyText(bold, small, smallOnBig, center, color, fontPrimary)}
    >
      {children}
    </p>
  )
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
  fontSize('text-sm', 'xs:text-lg'),
  lineHeight('leading-none')
)
export function LogoText({ children }: ChildrenProp) {
  return <span className={logoText}>{children}</span>
}

const subheaderCardText = classnames(
  textColor('text-formal-accent'),
  fontFamily('font-primary'),
  fontWeight('font-bold'),
  fontSize('text-lg'),
  lineHeight('leading-7')
)
export function SubheaderCardText({ children }: ChildrenProp) {
  return <p className={subheaderCardText}>{children}</p>
}

const cardParagraphText = classnames(
  textColor('text-formal-accent'),
  fontFamily('font-primary'),
  fontSize('text-sm', 'sm:text-base'),
  lineHeight('leading-6')
)
export function CardParagraphText({ children }: ChildrenProp) {
  return <p className={cardParagraphText}>{children}</p>
}

const logoSubText = classnames(
  textColor('text-primary-semi-dimmed', 'selection:text-primary'),
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
) => {
  const withGradients = !!gradientFrom && !!gradientTo

  return classnames(
    textDecoration('no-underline'),
    textColor(withGradients ? 'text-transparent' : color || 'text-accent'),
    backgroundImage({ 'bg-gradient-to-r': withGradients }),
    backgroundClip({ 'bg-clip-text': withGradients }),
    fontSize('text-sm', 'xs:text-base'),
    gradientColorStops(gradientFrom, gradientTo),
    fontWeight({ 'font-bold': bold })
  )
}
export function LinkText({
  url,
  bold,
  title,
  color,
  internal,
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
  internal?: boolean
  gradientFrom?: TGradientColorStops
  gradientTo?: TGradientColorStops
}) {
  return internal ? (
    <NavLink
      to={url}
      className={linkText(bold, color, gradientFrom, gradientTo)}
    >
      {children}
    </NavLink>
  ) : (
    <a
      className={linkText(bold, color, gradientFrom, gradientTo)}
      href={url}
      title={title}
      target={targetBlank ? '_blank' : '_self'}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

const footerLink = (active?: boolean) =>
  classnames(
    fontSize('text-sm'),
    fontWeight('font-semibold'),
    textDecoration({ underline: active, 'hover:underline': true }),
    textColor({
      'text-accent': active,
      'hover:text-accent': true,
    }),
    transitionProperty('transition-colors')
  )
export function FooterLink({
  url,
  children,
  internal,
}: ChildrenProp & { url: string; internal?: boolean }) {
  return internal ? (
    <NavLink
      replace
      to={url}
      className={({ isActive }: { isActive?: boolean }) => footerLink(isActive)}
    >
      {children}
    </NavLink>
  ) : (
    <a
      className={footerLink()}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

const socialLink = classnames(
  lineHeight('leading-6'),
  fontSize('text-base'),
  textDecoration('no-underline', 'active:underline'),
  textColor('active:text-tertiary', 'text-formal-accent')
)
export function SocialLink({ url, children }: ChildrenProp & { url: string }) {
  return (
    <a
      className={classNamesToString(socialLink, 'hover-tertiary')}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
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

export const highlightedText = (bold?: boolean, center?: boolean) =>
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

const sectionTitle = fontSize('text-sm')
export function SectionTitle({ children }: ChildrenProp) {
  return <p className={sectionTitle}>{children}</p>
}

const tinyText = (color: 'base' | 'primary' | 'error', fontPrimary?: boolean) =>
  classnames(
    textColor(
      color === 'error'
        ? 'text-error'
        : color === 'primary'
        ? { 'text-primary-semi-dimmed': true, 'selection:text-primary': true }
        : 'text-formal-accent'
    ),
    fontFamily(fontPrimary ? 'font-primary' : undefined),
    fontSize('text-xs'),
    lineHeight('leading-3')
  )
export function TinyText({
  color = 'base',
  fontPrimary,
  children,
}: {
  color?: 'base' | 'primary' | 'error'
  fontPrimary?: boolean
} & ChildrenProp) {
  return <div className={tinyText(color, fontPrimary)}>{children}</div>
}

const textButton = classnames(
  textDecoration('underline'),
  opacity('disabled:opacity-75')
)
export function TextButton(props: React.HTMLAttributes<HTMLButtonElement>) {
  return <button className={textButton} {...props} />
}

const extraBoldText = (small?: boolean, extraLeading?: boolean) =>
  classnames(
    fontWeight('font-bold', 'md:font-extrabold'),
    fontSize(
      extraLeading ? 'text-2xl' : small ? 'text-xs' : 'text-xl',
      'md:text-2xl'
    ),
    lineHeight(
      extraLeading ? 'leading-8' : small ? 'leading-3' : 'leading-7',
      extraLeading ? 'md:leading-10' : 'md:leading-8'
    ),
    textColor('text-primary-dark'),
    textTransform('uppercase')
  )
export function ExtraBoldText({
  small,
  extraLeading,
  children,
}: ChildrenProp & {
  small?: boolean
  extraLeading?: boolean
}) {
  return <span className={extraBoldText(small, extraLeading)}>{children}</span>
}
