import { createContext } from 'preact'
import CardColor from 'models/CardColor'

export default createContext<{
  cardColor: CardColor
}>({
  cardColor: 'accent',
})
