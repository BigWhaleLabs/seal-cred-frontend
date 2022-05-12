import { HighlightedText } from 'components/Text'
import Colors from 'types/Colors'
import OrbBox from 'icons/OrbInBox'
import classnames, {
  alignItems,
  display,
  flexDirection,
  space,
} from 'classnames/tailwind'

const orbBoxes = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2')
)
const orbBox = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  space('space-y-2')
)

export default function OrbsInBoxes() {
  return (
    <div className={orbBoxes}>
      <div className={orbBox}>
        <OrbBox color={Colors.green} />
        <HighlightedText color={Colors.green} center onlyWrap bold>
          Wallet 01
        </HighlightedText>
      </div>
      <div className={orbBox}>
        <OrbBox color={Colors.yellow} />
        <HighlightedText color={Colors.yellow} center onlyWrap bold>
          Wallet 02
        </HighlightedText>
      </div>
      <div className={orbBox}>
        <OrbBox color={Colors.pink} />
        <HighlightedText color={Colors.pink} center onlyWrap bold>
          Wallet 03
        </HighlightedText>
      </div>
    </div>
  )
}
