import { FC } from 'react'
import classnames, {
  TBackgroundColor,
  backgroundColor,
  backgroundImage,
  backgroundRepeat,
  height,
  opacity,
  width,
} from 'classnames/tailwind'

const rectangle = (bgColor: TBackgroundColor) =>
  classnames(
    backgroundColor(bgColor),
    height('h-noisy-rectangle'),
    width('fold:w-36', 'w-28'),
    opacity('opacity-50')
  )
const noise = classnames(
  width('w-full'),
  height('h-full'),
  backgroundRepeat('bg-repeat'),
  backgroundImage('bg-noise')
)

const NoisyRectangle: FC<{ bgColor: TBackgroundColor }> = ({ bgColor }) => {
  return (
    <div className={rectangle(bgColor)}>
      <div className={noise} />
    </div>
  )
}

export default NoisyRectangle
