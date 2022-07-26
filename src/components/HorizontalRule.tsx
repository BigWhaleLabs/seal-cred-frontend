import Color from 'models/Color'
import colorToBorderColor from 'helpers/colors/colorToBorderColor'

export default function ({ color }: { color: Color }) {
  return <hr className={colorToBorderColor(color)} />
}
