import { borderColor } from 'classnames/tailwind'
import Color from 'models/Color'

export default function (color: Color) {
  switch (color) {
    case 'primary-semi-dimmed':
      return borderColor('border-primary-semi-dimmed')
    case 'formal-accent-semi-transparent':
      return borderColor('border-formal-accent-semi-transparent')
  }
}
