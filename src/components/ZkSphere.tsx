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
import useSphereAnimation from 'helpers/useSphereAnimation'

const sphereStyles = (bgColor: TBackgroundColor, shadowColor: TDropShadow) =>
  classnames(
    fontWeight('font-bold'),
    textColor('text-blue-900'),
    display('inline-block'),
    backgroundColor(bgColor),
    height('h-8'),
    width('w-8'),
    borderRadius('rounded-full'),
    dropShadow(shadowColor),
    textAlign('text-center'),
    padding('pt-1'),
    margin('mt-2.125'),
    transitionProperty('transition-transform')
  )

const ZkSphere: FC<{
  color: Colors
  animated?: boolean
  text?: string
}> = ({ color, children, animated, text }) => {
  const bgColor = colorToTailwindBg(color)
  const shadowColor = colorToDropShadow(color)

  const { x, y, zkText } = useSphereAnimation(color)

  return animated ? (
    <div
      style={{ transform: `translate(${x}px, ${y}px)` }}
      className={sphereStyles(bgColor, shadowColor)}
    >
      {zkText}
    </div>
  ) : (
    <div className={sphereStyles(bgColor, shadowColor)}>{children || text}</div>
  )
}

export default ZkSphere
