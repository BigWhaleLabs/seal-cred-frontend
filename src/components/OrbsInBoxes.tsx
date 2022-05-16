import { HighlightedText } from 'components/Text'
import Colors from 'models/Colors'
import OrbBox from 'icons/OrbInBox'
import ZkSphere from 'components/ZkSphere'
import classnames, {
  TMargin,
  alignItems,
  display,
  flexDirection,
  margin,
  space,
  zIndex,
} from 'classnames/tailwind'

const orbBoxes = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2'),
  zIndex('z-40')
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
  return (
    <div className={orbBoxes} style={{ transform: 'translateY(90px)' }}>
      <div className={orbBox('mt-8')}>
        <OrbBox color={Colors.green} />
        <div className="absolute">
          <ZkSphere color={Colors.green} animated />
        </div>
        <HighlightedText color={Colors.green} center onlyWrap bold>
          Wallet 01
        </HighlightedText>
      </div>
      <div className={orbBox()}>
        <OrbBox color={Colors.yellow} />
        <div className="absolute">
          <ZkSphere color={Colors.yellow} animated />
        </div>
        <HighlightedText color={Colors.yellow} center onlyWrap bold>
          Wallet 02
        </HighlightedText>
      </div>
      <div className={orbBox('mt-11')}>
        <OrbBox color={Colors.pink} />
        <div className="absolute">
          <ZkSphere color={Colors.pink} animated />
        </div>
        <HighlightedText color={Colors.pink} center onlyWrap bold>
          Wallet 03
        </HighlightedText>
      </div>
    </div>
  )
}
