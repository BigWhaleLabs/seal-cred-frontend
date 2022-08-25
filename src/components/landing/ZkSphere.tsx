import { SphereText } from 'components/ui/Text'
import Color from 'models/Color'
import classnames, {
  alignItems,
  borderRadius,
  boxShadow,
  display,
  fontWeight,
  height,
  justifyContent,
  textAlign,
  textColor,
  transitionProperty,
  width,
} from 'classnames/tailwind'
import colorToDropShadow from 'helpers/colors/colorToDropShadow'
import colorToTailwindBackground from 'helpers/colors/colorToTailwindBackground'
import useScrollPercent from 'hooks/useScrollPercent'

const sphereStyles = classnames(
  display('flex'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  fontWeight('font-bold'),
  textColor('text-primary-dark'),
  display('inline-block'),
  height('h-8'),
  width('w-8'),
  borderRadius('rounded-full'),
  textAlign('text-center'),
  transitionProperty('transition-all')
)

interface ZkSphereProps {
  color: Color
  animated?: boolean
  text?: string
}

export default function ({ color, animated, text }: ZkSphereProps) {
  const bgColor = colorToTailwindBackground(color)
  const shadowColor = classnames(
    colorToDropShadow(color),
    boxShadow('shadow-lg')
  )

  const scroll = useScrollPercent()

  const zkText = scroll > 0.3 ? 'ZK' : ''

  return animated ? (
    <div
      style={{
        animationName:
          color === 'tertiary'
            ? 'tertiarySphereAnimation'
            : color === 'accent'
            ? 'accentSphereAnimation'
            : 'secondarySphereAnimation',
        animationTimingFunction: 'ease-in-out',
        animationDuration: '1s',
        animationDirection: 'linear',
        animationPlayState: 'paused',
        animationDelay: `calc(${scroll} * -1s)`,
        animationIterationCount: 1,
        animationFillMode: 'both',
      }}
      className={classnames(sphereStyles, bgColor, shadowColor)}
    >
      <SphereText>{zkText}</SphereText>
    </div>
  ) : (
    <div className={classnames(sphereStyles, bgColor, shadowColor)}>
      <SphereText>{text}</SphereText>
    </div>
  )
}
