import { FC } from 'react'
import classnames, {
  TBackgroundColor,
  backgroundColor,
  backgroundRepeat,
  height,
  opacity,
  width,
} from 'classnames/tailwind'

const rectangle = (bgColor: TBackgroundColor) =>
  classnames(
    backgroundColor(bgColor),
    height('h-2.75'),
    width('fold:w-36', 'w-28'),
    opacity('opacity-50')
  )
const noise = classnames(
  width('w-full'),
  height('h-full'),
  backgroundRepeat('bg-repeat')
)

const NoisyRectangle: FC<{ bgColor: TBackgroundColor }> = ({ bgColor }) => {
  return (
    <div className={rectangle(bgColor)}>
      <div
        style={{ backgroundImage: 'url("/img/noise50.png")' }}
        className={noise}
      />
    </div>
  )
}

export default NoisyRectangle
