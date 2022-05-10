import { FC } from 'react'
import classnames, {
  TBackgroundColor,
  TBoxShadowColor,
  backgroundColor,
  borderRadius,
  boxShadow,
  boxShadowColor,
  display,
  fontWeight,
  height,
  padding,
  textAlign,
  textColor,
  width,
} from 'classnames/tailwind'

const sphereStyles = (
  bgColor: TBackgroundColor,
  shadowColor: TBoxShadowColor
) =>
  classnames(
    fontWeight('font-bold'),
    textColor('text-blue-900'),
    display('inline-block'),
    backgroundColor(bgColor),
    height('h-8'),
    width('w-8'),
    borderRadius('rounded-full'),
    boxShadow('shadow-2xl'),
    boxShadowColor(shadowColor),
    textAlign('text-center'),
    padding('pt-1')
  )

const ZkSphere: FC<{
  bgColor: TBackgroundColor
  shadowColor: TBoxShadowColor
}> = ({ bgColor, shadowColor }) => {
  return <div className={sphereStyles(bgColor, shadowColor)}>ZK</div>
}

export default ZkSphere
