import { BodyText } from 'components/Text'
import { FC } from 'react'
import Card from 'components/Card'
import Colors from 'models/Colors'
import DoubleSmile from 'icons/DoubleSmile'
import NoisyRectangle from 'components/NoisyRectangle'
import ZkSphere from 'components/ZkSphere'
import classnames, {
  alignItems,
  display,
  flexDirection,
  margin,
  opacity,
  space,
  transitionProperty,
} from 'classnames/tailwind'

const innerId = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)
const greenRectangle = classnames(margin('mb-1'))
const identityText = classnames(margin('my-3'))
const zkSpheresLeft = (reveal?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    space('space-x-2'),
    margin('my-2'),
    opacity(reveal ? 'opacity-100' : 'opacity-0'),
    transitionProperty('transition-all')
  )

const IdentityCardOne: FC<{ reveal?: boolean }> = ({ reveal }) => {
  return (
    <Card color="white" shadow thin small onlyWrap>
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
        <div className={zkSpheresLeft(reveal)}>
          <ZkSphere text="ZK" color={Colors.green} />
          <ZkSphere text="ZK" color={Colors.yellow} />
        </div>
      </div>
    </Card>
  )
}

export default IdentityCardOne
