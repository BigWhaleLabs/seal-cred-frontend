import { gradientColorStops } from 'classnames/tailwind'
import Color from 'models/Color'

export default function (color: Color, fromLight?: boolean) {
  const from = fromLight ? 'from-formal-accent' : 'from-primary-dark'
  switch (color) {
    case 'accent':
      return gradientColorStops(from, 'to-accent')
    case 'primary':
      return gradientColorStops(from, 'to-primary')
    case 'tertiary':
      return gradientColorStops(from, 'to-tertiary')
    case 'secondary':
      return gradientColorStops(from, 'to-secondary')
  }
}
