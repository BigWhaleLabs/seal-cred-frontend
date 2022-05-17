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
  space,
  transitionProperty,
  zIndex,
} from 'classnames/tailwind'
import useScrollPercent from 'helpers/useScrollPercent'

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

export default function OrbsInBoxes() {
  const scroll = useScrollPercent()
  const animNotStarted = scroll < 0.2

  return (
    <div className={orbBoxes} style={{ transform: 'translateY(90px)' }}>
      <div className={orbBox('mt-8')}>
        <OrbBox color={Colors.tertiary} shadow={animNotStarted} />
        <div className="absolute">
          <ZkSphere color={Colors.tertiary} animated />
        </div>
        <HighlightedText color={Colors.tertiary} center onlyWrap bold>
          Wallet 01
        </HighlightedText>
      </div>
      <div className={orbBox()}>
        <OrbBox color={Colors.primary} shadow={animNotStarted} />
        <div className="absolute">
          <ZkSphere color={Colors.primary} animated />
        </div>
        <HighlightedText color={Colors.primary} center onlyWrap bold>
          Wallet 02
        </HighlightedText>
      </div>
      <div className={orbBox('mt-11')}>
        <OrbBox color={Colors.secondary} shadow={animNotStarted} />
        <div className="absolute">
          <ZkSphere color={Colors.secondary} animated />
        </div>
        <HighlightedText color={Colors.secondary} center onlyWrap bold>
          Wallet 03
        </HighlightedText>
      </div>
    </div>
  )
}
