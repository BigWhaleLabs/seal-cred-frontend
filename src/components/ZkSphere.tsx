import { FC } from 'react'
import Colors, { colorToDropShadow, colorToTailwindBg } from 'types/Colors'
import classnames, {
  TBackgroundColor,
  TDropShadow,
  backgroundColor,
  borderRadius,
  display,
  dropShadow,
  fontWeight,
  height,
  padding,
  textAlign,
  textColor,
  width,
} from 'classnames/tailwind'

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
    padding('pt-1')
  )

const ZkSphere: FC<{
  color: Colors
  text?: string
}> = ({ color, children, text }) => {
  const bgColor = colorToTailwindBg(color)
  const shadowColor = colorToDropShadow(color)

  return (
    <div className={sphereStyles(bgColor, shadowColor)}>{children || text}</div>
  )
}

export default ZkSphere
