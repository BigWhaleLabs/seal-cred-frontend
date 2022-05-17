import {
  AccentTextProps,
  BodyTextSize,
  HeaderSize,
  LinkTextProps,
} from 'models/TextProps'
import { FC } from 'react'
import {
  TBackgroundColor,
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

export const textTruncateStyles = classnames(
  width('w-fit'),
  textOverflow('text-ellipsis'),
  overflow('overflow-hidden'),
  whitespace('whitespace-nowrap'),
  margin('mr-1')
)

const headerText = (size: HeaderSize, leading = 8, bold = true) =>
  classnames(
    fontFamily('font-primary'),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    fontSize(`text-${size}`),
    textColor('text-white'),
    lineHeight(leading === 11 ? 'leading-11' : 'leading-8')
  )

export const HeaderText: FC<{
  size: HeaderSize
  leading?: number
  bold?: boolean
}> = ({ size, bold, leading, children }) => {
  return <h1 className={headerText(size, leading, bold)}>{children}</h1>
}

const subheaderText = classnames(
  textColor('text-primary'),
  fontFamily('font-primary')
)
export const SubheaderText: FC = ({ children }) => {
  return <h2 className={subheaderText}>{children}</h2>
}

const accentText = ({ color, align, bold, small }: AccentTextProps) =>
  classnames(
    textColor(color),
    textAlign(align),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    fontSize(small ? 'text-sm' : undefined)
  )
export const AccentText: FC<AccentTextProps> = (props) => {
  return <span className={accentText(props)}>{props.children}</span>
}

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
export const BodyText: FC<{
  size: BodyTextSize
  leading?: 3 | 4 | 5 | 6
  center?: boolean
  overflow?: boolean
}> = ({ size, center, leading, overflow, children }) => {
  return (
    <div className={bodyText(size, leading, center, overflow)}>{children}</div>
  )
}

const largerText = classnames(
  textColor('text-primary-dark'),
  fontSize('text-2xl')
)
export const LargerText: FC = ({ children }) => {
  return <div className={largerText}>{children}</div>
}

const cardHeader = (color?: TTextColor) =>
  classnames(textColor(color || 'text-white'))
export const CardHeader: FC<{ color?: TTextColor }> = ({ color, children }) => {
  return <div className={cardHeader(color)}>{children}</div>
}

const cardDescription = classnames(
  textColor('text-white'),
  fontSize('text-2xl'),
  fontFamily('font-primary'),
  fontWeight('font-bold')
)
export const CardDescription: FC = ({ children }) => {
  return <div className={cardDescription}>{children}</div>
}

const logoText = classnames(
  textColor('text-accent'),
  fontWeight('font-bold'),
  fontSize('text-xl')
)
export const LogoText: FC = ({ children }) => {
  return <span className={logoText}>{children}</span>
}

const badgeText = textColor('text-white')
export const BadgeText: FC = ({ children }) => {
  return <span className={badgeText}>{children}</span>
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
export const LinkText: FC<LinkTextProps> = (props) => {
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
export const SubBadgeText: FC = ({ children }) => {
  return <span className={subBadgeText}>{children}</span>
}

const boldColoredText = (color?: TTextColor) =>
  classnames(
    textColor('text-secondary'),
    fontSize('text-sm'),
    textColor(color || 'text-primary-dark')
  )
export const BoldColoredText: FC<{ color?: TTextColor }> = ({
  color,
  children,
}) => {
  return <span className={boldColoredText(color)}>{children}</span>
}

const tooltipText = classnames(
  fontWeight('font-bold'),
  textColor('text-primary-dark'),
  fontFamily('font-primary')
)
export const TooltipText: FC = ({ children }) => {
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
export const HighlightedText: FC<{
  center?: boolean
  color?: Colors
  bold?: boolean
  onlyWrap?: boolean
}> = ({ children, center, color, bold, onlyWrap }) => {
  const bgColor = colorToTailwindBg(color)

  return (
    <div className={highlightedText(bgColor, center, bold, onlyWrap)}>
      {children}
    </div>
  )
}
