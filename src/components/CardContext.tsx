import { createContext } from 'preact'

export type CardColor =
  | 'accent'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'formal-accent'

export default createContext<{
  cardColor: CardColor
}>({
  cardColor: 'accent',
})
