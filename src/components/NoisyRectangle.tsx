import { FC } from 'react'
import classnames, {
  TBackgroundColor,
  backgroundColor,
  height,
  width,
} from 'classnames/tailwind'

const rectangle = (bgColor: TBackgroundColor) =>
  classnames(
    backgroundColor(bgColor),
    height('h-2.75'),
    width('w-36', 'fold:w-28')
  )

const NoisyRectangle: FC<{ bgColor: TBackgroundColor }> = ({ bgColor }) => {
  return <div className={rectangle(bgColor)} />
}

export default NoisyRectangle
