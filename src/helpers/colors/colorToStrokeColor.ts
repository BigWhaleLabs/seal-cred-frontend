import { stroke } from 'classnames/tailwind'
import Color from 'models/Color'

export default function (color: Color) {
  switch (color) {
    case 'tertiary':
      return stroke('stroke-tertiary')
    case 'secondary':
      return stroke('stroke-secondary')
    case 'accent':
      return stroke('stroke-accent')
  }
}
