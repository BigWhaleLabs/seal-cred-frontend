import { HighlightedText } from 'components/Text'
import Colors, { colorToTailwindBg } from 'models/Colors'
import OrbBox from 'icons/OrbBox'
import ZkSphere from 'components/landing/ZkSphere'
import classnames, {
  TMargin,
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  margin,
  padding,
  position,
  space,
  transitionProperty,
  zIndex,
} from 'classnames/tailwind'
import useScrollPercent from 'hooks/useScrollPercent'

const orbBoxes = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2'),
  transitionProperty('transition-all'),
  zIndex('z-30')
)
const orbBox = (margins?: TMargin) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    alignItems('items-center'),
    space('space-y-2'),
    margin(margins)
  )
const highlightedWrapper = (color: Colors) =>
  classnames(
    padding('px-2', 'py-1'),
    borderRadius('rounded-full'),
    backgroundColor(colorToTailwindBg(color)),
    zIndex('z-10')
  )

export default function () {
  const scroll = useScrollPercent()
  const animNotStarted = scroll < 0.2

  return (
    <div className={orbBoxes} style={{ transform: 'translateY(5.625rem)' }}>
      <div className={orbBox('mt-8')}>
        <OrbBox color={Colors.tertiary} shadow={animNotStarted} />
        <div className={position('absolute')}>
          <ZkSphere color={Colors.tertiary} animated />
        </div>
        <div className={highlightedWrapper(Colors.tertiary)}>
          <HighlightedText center>Wallet 01</HighlightedText>
        </div>
      </div>
      <div className={orbBox()}>
        <OrbBox color={Colors.accent} shadow={animNotStarted} />
        <div className={position('absolute')}>
          <ZkSphere color={Colors.accent} animated />
        </div>
        <div className={highlightedWrapper(Colors.accent)}>
          <HighlightedText center>Wallet 02</HighlightedText>
        </div>
      </div>
      <div className={orbBox('mt-11')}>
        <OrbBox color={Colors.secondary} shadow={animNotStarted} />
        <div className={position('absolute')}>
          <ZkSphere color={Colors.secondary} animated />
        </div>
        <div className={highlightedWrapper(Colors.secondary)}>
          <HighlightedText center>Wallet 03</HighlightedText>
        </div>
      </div>
    </div>
  )
}
