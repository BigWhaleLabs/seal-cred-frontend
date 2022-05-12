enum Colors {
  pink = '#ff7bed',
  green = '#01feb6',
  yellow = '#fed823',
}

export const colorToTailwindBg = (color?: Colors) =>
  color === Colors.green
    ? 'bg-green'
    : color === Colors.yellow
    ? 'bg-yellow'
    : color == Colors.pink
    ? 'bg-pink'
    : 'bg-white'

export const colorToDropShadow = (color?: Colors) =>
  color === Colors.pink
    ? 'drop-shadow-pink'
    : color === Colors.green
    ? 'drop-shadow-green'
    : 'drop-shadow-yellow'

export default Colors
