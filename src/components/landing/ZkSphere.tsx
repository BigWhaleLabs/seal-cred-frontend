import Color from 'models/Color'
import classnames, {
  borderRadius,
  display,
  fontWeight,
  height,
  margin,
  padding,
  textAlign,
  textColor,
  transitionProperty,
  width,
} from 'classnames/tailwind'
import colorToDropShadow from 'helpers/colorToDropShadow'
import colorToTailwindBackground from 'helpers/colorToTailwindBackground'
import useScrollPercent from 'hooks/useScrollPercent'

const sphereStyles = classnames(
  fontWeight('font-bold'),
  textColor('text-primary-dark'),
  display('inline-block'),
  height('h-8'),
  width('w-8'),
  borderRadius('rounded-full'),
  textAlign('text-center'),
  padding('pt-1'),
  margin('mt-8.5'),
  transitionProperty('transition-all')
)

interface ZkSphereProps {
  color: Color
  animated?: boolean
  text?: string
}

export default function ({ color, animated, text }: ZkSphereProps) {
  const bgColor = colorToTailwindBackground(color)
  const shadowColor = colorToDropShadow(color)

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
      {zkText}
    </div>
  ) : (
    <div className={classnames(sphereStyles, bgColor, shadowColor)}>{text}</div>
  )
}
