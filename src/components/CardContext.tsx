import { createContext } from 'preact'
import Color from 'models/Color'

const cardContext = createContext<{
  cardColor: Color
}>({
  cardColor: 'accent',
})

export default cardContext
