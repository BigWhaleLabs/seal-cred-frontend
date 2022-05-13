import { FC, MutableRefObject, useRef } from 'react'
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
  margin,
  padding,
  textAlign,
  textColor,
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
    margin('mt-2.125')
  )

const ZkSphere: FC<{
  color: Colors
  text?: string
}> = ({ color, children, text }) => {
  const bgColor = colorToTailwindBg(color)
  const shadowColor = colorToDropShadow(color)

  const sphereRef = useRef() as MutableRefObject<HTMLDivElement>
  const { x, y } = useSphereAnimation(sphereRef)

  return (
    <div
      style={{ transform: `translate(${x} ${y})` }}
      className={sphereStyles(bgColor, shadowColor)}
      ref={sphereRef}
    >
      {children || text}
    </div>
  )
}

export default ZkSphere
