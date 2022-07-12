import { fill } from 'classnames/tailwind'
import Color from 'models/Color'

export default function (color: Color) {
  switch (color) {
    case 'accent':
      return fill('fill-accent')
    case 'tertiary':
      return fill('fill-tertiary')
    case 'secondary':
      return fill('fill-secondary')
  }
}
