import { BodyText } from 'components/Text'
import { FC } from 'react'
import Card from 'components/Card'
import Colors from 'models/Colors'
import Grim from 'icons/Grin'
import NoisyRectangle from 'components/NoisyRectangle'
import ZkSphere from 'components/ZkSphere'
import classnames, {
  alignItems,
  display,
  flexDirection,
  margin,
  opacity,
  transitionProperty,
} from 'classnames/tailwind'

const innerId = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)
const identityText = classnames(margin('my-3'))
const pinkRectangle = classnames(margin('my-1.875'))
const zkSpheresRight = (reveal?: boolean) =>
  classnames(
    margin('my-2'),
    opacity(reveal ? 'opacity-100' : 'opacity-0'),
    transitionProperty('transition-all')
  )

const IdentityCardTwo: FC<{ reveal?: boolean }> = ({ reveal }) => {
  return (
    <Card color="white" shadow thin small onlyWrap>
      <div className={innerId}>
        <div className={pinkRectangle}>
          <NoisyRectangle bgColor="bg-pink" />
        </div>
        <div className={identityText}>
          <BodyText size="base" center>
            Identity-02
          </BodyText>
        </div>
        <Grim />
        <div className={zkSpheresRight(reveal)}>
          <ZkSphere text="ZK" color={Colors.pink} />
        </div>
      </div>
    </Card>
  )
}

export default IdentityCardTwo
