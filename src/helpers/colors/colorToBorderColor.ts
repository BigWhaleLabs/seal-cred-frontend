import { borderColor } from 'classnames/tailwind'
import Color from 'models/Color'

export default function (color: Color) {
  switch (color) {
    case 'accent':
      return borderColor('border-accent')
    case 'tertiary':
      return borderColor('border-tertiary')
    case 'secondary':
      return borderColor('border-secondary')
    case 'formal-accent':
      return borderColor('border-formal-accent')
    case 'primary':
      return borderColor('border-primary')
    case 'primary-dark':
      return borderColor('border-primary-dark')
    case 'primary-semi-dimmed':
      return borderColor('border-primary-semi-dimmed')
    case 'formal-accent-semi-transparent':
      return borderColor('border-formal-accent-semi-transparent')
  }
}
