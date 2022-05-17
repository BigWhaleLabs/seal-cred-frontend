enum Colors {
  accent = '#fed823',
  secondary = '#ff7bed',
  tertiary = '#01feb6',
}

export const colorToTailwindBg = (color?: Colors) =>
  color === Colors.tertiary
    ? 'bg-tertiary'
    : color === Colors.accent
    ? 'bg-accent'
    : color == Colors.secondary
    ? 'bg-secondary'
    : 'bg-white'

export const colorToDropShadow = (color?: Colors) =>
  color === Colors.secondary
    ? 'drop-shadow-secondary'
    : color === Colors.tertiary
    ? 'drop-shadow-tertiary'
    : 'drop-shadow-accent'

export default Colors
