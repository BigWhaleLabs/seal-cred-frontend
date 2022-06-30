import { dropShadow } from 'classnames/tailwind'
import CardColor from 'models/CardColor'

export default function (color: CardColor) {
  switch (color) {
    case 'accent':
      return dropShadow('drop-shadow-accent')
    case 'tertiary':
      return dropShadow('drop-shadow-tertiary')
    case 'secondary':
      return dropShadow('drop-shadow-secondary')
    case 'primary':
      return dropShadow('drop-shadow-primary')
    case 'formal-accent':
      return dropShadow('drop-shadow-formal-accent')
  }
}
