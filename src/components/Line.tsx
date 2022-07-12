import Color from 'models/Color'
import classnames, {
  backgroundImage,
  display,
  height,
  width,
} from 'classnames/tailwind'
import colorsToGradientColorStops from 'helpers/colors/colorsToGradientColorStops'
import useBreakpoints from 'hooks/useBreakpoints'

const line = (
  iPhoneSizes: boolean,
  gradientDirection: 'to-left' | 'to-right',
  small?: boolean
) => {
  return classnames(
    height('h-px'),
    width(small ? (iPhoneSizes ? 'w-8' : 'w-20') : 'w-36'),
    backgroundImage(
      gradientDirection === 'to-left' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
    ),
    display('hidden', 'tiny:block')
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
  const { iPhoneSizes } = useBreakpoints()
  const gradient = colorsToGradientColorStops(color, fromLight)
  const lineClassName = classnames(
    line(iPhoneSizes, gradientDirection, small),
    gradient
  )

  return <div className={lineClassName} />
}
