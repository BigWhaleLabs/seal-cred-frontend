import { backgroundColor } from 'classnames/tailwind'
import Color from 'models/Color'

export default function (color: Color) {
  switch (color) {
    case 'accent':
      return backgroundColor('bg-accent')
    case 'tertiary':
      return backgroundColor('bg-tertiary')
    case 'secondary':
      return backgroundColor('bg-secondary')
  }
}
