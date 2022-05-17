import { FC } from 'react'
import Colors, { colorToDropShadow, colorToTailwindBg } from 'models/Colors'
import classnames, {
  TBackgroundColor,
  TDropShadow,
  backgroundColor,
  borderRadius,
  display,
  dropShadow,
  fontWeight,
  height,
  margin,
  padding,
  textAlign,
  textColor,
  transitionProperty,
  width,
} from 'classnames/tailwind'
import useScrollPercent from 'helpers/useScrollPercent'

const sphereStyles = (bgColor: TBackgroundColor, shadowColor: TDropShadow) =>
  classnames(
    fontWeight('font-bold'),
    textColor('text-accent-dark'),
    display('inline-block'),
    backgroundColor(bgColor),
    height('h-8'),
    width('w-8'),
    borderRadius('rounded-full'),
    dropShadow(shadowColor),
    textAlign('text-center'),
    padding('pt-1'),
    margin('mt-2.125'),
    transitionProperty('transition-all')
  )

const ZkSphere: FC<{
  color: Colors
  animated?: boolean
  text?: string
}> = ({ color, children, animated, text }) => {
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
            : color === Colors.primary
            ? 'primarySphereAnimation'
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
      {zkText}
    </div>
  ) : (
    <div className={sphereStyles(bgColor, shadowColor)}>{children || text}</div>
  )
}

export default ZkSphere
