import { CardColor } from 'components/CardContext'
import { textColor } from 'classnames/tailwind'

export default function (color: CardColor) {
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
