import { textColor } from 'classnames/tailwind'
import CardColor from 'models/CardColor'

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
