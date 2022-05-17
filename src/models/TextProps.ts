import {
  TGradientColorStops,
  TTextAlign,
  TTextColor,
} from 'classnames/tailwind'

export interface AccentTextProps {
  color: TTextColor
  align?: TTextAlign
  bold?: boolean
  small?: boolean
}

export interface LinkTextProps {
  url: string
  gradientFrom?: TGradientColorStops
  gradientTo?: TGradientColorStops
  color?: TTextColor
  title?: string
  bold?: boolean
  onClick?: () => void
}

export type BodyTextSize = 'lg' | 'base' | 'sm' | 'xxs'

export type HeaderSize = '4xl' | '3xl' | '2xl'
