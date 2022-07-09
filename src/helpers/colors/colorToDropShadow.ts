import { dropShadow } from 'classnames/tailwind'
import Color from 'models/Color'

export default function (color: Color) {
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
