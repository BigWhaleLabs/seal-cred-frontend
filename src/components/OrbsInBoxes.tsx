import { HighlightedText } from 'components/Text'
import Colors from 'models/Colors'
import OrbBox from 'icons/OrbBox'
import ZkSphere from 'components/ZkSphere'
import classnames, {
  TMargin,
  alignItems,
  display,
  flexDirection,
  margin,
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
        <HighlightedText color={Colors.tertiary} center onlyWrap bold>
          Wallet 01
        </HighlightedText>
      </div>
      <div className={orbBox()}>
        <OrbBox color={Colors.accent} shadow={animNotStarted} />
        <div className={position('absolute')}>
          <ZkSphere color={Colors.accent} animated />
        </div>
        <HighlightedText color={Colors.accent} center onlyWrap bold>
          Wallet 02
        </HighlightedText>
      </div>
      <div className={orbBox('mt-11')}>
        <OrbBox color={Colors.secondary} shadow={animNotStarted} />
        <div className={position('absolute')}>
          <ZkSphere color={Colors.secondary} animated />
        </div>
        <HighlightedText color={Colors.secondary} center onlyWrap bold>
          Wallet 03
        </HighlightedText>
      </div>
    </div>
  )
}
