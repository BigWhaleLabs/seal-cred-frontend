import { BodyText } from 'components/Text'
import Card from 'components/Card'
import Colors from 'types/Colors'
import DoubleSmile from 'icons/DoubleSmile'
import NoisyRectangle from 'components/NoisyRectangle'
import ZkSphere from 'components/ZkSphere'
import classnames, {
  alignItems,
  display,
  flexDirection,
  margin,
  space,
} from 'classnames/tailwind'

const innerId = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)
const greenRectangle = classnames(margin('mb-1'))
const identityText = classnames(margin('my-3'))
const zkSpheresLeft = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2'),
  margin('mt-2')
)

function IdentityCardOne() {
  return (
    <Card color="white" shadow thin small>
      <div className={innerId}>
        <div className={greenRectangle}>
          <NoisyRectangle bgColor="bg-green" />
        </div>
        <NoisyRectangle bgColor="bg-yellow" />
        <div className={identityText}>
          <BodyText size="base" center>
            Identity-01
          </BodyText>
        </div>
        <DoubleSmile />
        <div className={zkSpheresLeft}>
          <ZkSphere color={Colors.green} text="ZK" />
          <ZkSphere color={Colors.yellow} text="ZK" />
        </div>
      </div>
    </Card>
  )
}

export default IdentityCardOne
