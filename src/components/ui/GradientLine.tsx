import { displayFrom } from 'helpers/visibilityClassnames'
import Color from 'models/Color'
import classnames, { backgroundImage, height, width } from 'classnames/tailwind'
import colorsToGradientColorStops from 'helpers/colors/colorsToGradientColorStops'

const line = (gradientDirection: 'to-left' | 'to-right', small?: boolean) => {
  return classnames(
    height('h-px'),
    width({
      'w-8': small,
      'sm:w-20': small,
      'w-36': !small,
    }),
    backgroundImage(
      gradientDirection === 'to-left' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
    ),
    displayFrom('xs')
  )
}

export default ({
  color,
  gradientDirection,
  fromLight,
  small,
}: {
  color: Color
  gradientDirection: 'to-left' | 'to-right'
  fromLight?: boolean
  small?: boolean
}) => {
  const gradient = colorsToGradientColorStops(color, fromLight)
  const lineClassName = classnames(line(gradientDirection, small), gradient)

  return <div className={lineClassName} />
}
