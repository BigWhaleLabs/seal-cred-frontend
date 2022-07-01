import { textColor } from 'classnames/tailwind'
import Color from 'models/Color'

export default function (color: Color) {
  switch (color) {
    case 'accent':
      return textColor('text-accent')
    case 'tertiary':
      return textColor('text-tertiary')
    case 'secondary':
      return textColor('text-secondary')
    case 'primary':
      return textColor('text-primary')
    case 'formal-accent':
      return textColor('text-formal-accent')
  }
}
