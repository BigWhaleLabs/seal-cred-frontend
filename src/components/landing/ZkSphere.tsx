import { SphereText } from 'components/Text'
import Colors, { colorToDropShadow, colorToTailwindBg } from 'models/Colors'
import classnames, {
  TBackgroundColor,
  TDropShadow,
  backgroundColor,
  borderRadius,
  display,
  dropShadow,
  height,
  margin,
  padding,
  transitionProperty,
  width,
} from 'classnames/tailwind'
import useScrollPercent from 'hooks/useScrollPercent'

const sphereStyles = (bgColor: TBackgroundColor, shadowColor: TDropShadow) =>
  classnames(
    display('inline-block'),
    backgroundColor(bgColor),
    height('h-8'),
    width('w-8'),
    borderRadius('rounded-full'),
    dropShadow(shadowColor),
    padding('pt-1'),
    margin('mt-8.5'),
    transitionProperty('transition-all')
  )

interface ZkSphereProps {
  color: Colors
  animated?: boolean
  text?: string
}

export default function ({ color, animated, text }: ZkSphereProps) {
  const bgColor = colorToTailwindBg(color)
  const shadowColor = colorToDropShadow(color)

  const scroll = useScrollPercent()

  const zkText = scroll > 0.3 ? 'ZK' : ''

  return animated ? (
    <div
      style={{
        animationName:
          color === Colors.tertiary
            ? 'tertiarySphereAnimation'
            : color === Colors.accent
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
      className={sphereStyles(bgColor, shadowColor)}
    >
      <SphereText>{zkText}</SphereText>
    </div>
  ) : (
    <div className={sphereStyles(bgColor, shadowColor)}>
      <SphereText>{text}</SphereText>
    </div>
  )
}
