import { displayFrom } from 'helpers/visibilityClassnames'
import Color from 'models/Color'
import classnames, { backgroundImage, height, width } from 'classnames/tailwind'
import colorsToGradientColorStops from 'helpers/colors/colorsToGradientColorStops'

const line = (gradientDirection: 'to-left' | 'to-right', small?: boolean) => {
  return classnames(
    height('h-px'),
    width({
      'sm:w-20': small,
      'w-36': !small,
      'w-8': small,
    }),
    backgroundImage(
      gradientDirection === 'to-left' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
    ),
    displayFrom('xs')
  )
}

export default ({
  color,
  fromLight,
  gradientDirection,
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
