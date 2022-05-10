import { FC } from 'react'
import classnames, {
  TBackgroundColor,
  backgroundColor,
  height,
  margin,
  width,
} from 'classnames/tailwind'

const rectangle = (bgColor: TBackgroundColor) =>
  classnames(
    backgroundColor(bgColor),
    height('h-3'),
    width('w-36'),
    margin('my-1')
  )

const NoisyRectangle: FC<{ bgColor: TBackgroundColor }> = ({ bgColor }) => {
  return <div className={rectangle(bgColor)} />
}

export default NoisyRectangle
