import { borderColor } from 'classnames/tailwind'
import Color from 'models/Color'

export default function (color: Color) {
  switch (color) {
    case 'formal-accent':
      return borderColor('border-formal-accent')
    case 'primary-semi-dimmed':
      return borderColor('border-primary-semi-dimmed')
  }
}
