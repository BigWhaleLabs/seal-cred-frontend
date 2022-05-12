import { BodyText } from 'components/Text'
import Card from 'components/Card'
import Colors from 'types/Colors'
import Grim from 'icons/Grim'
import NoisyRectangle from 'components/NoisyRectangle'
import ZkSphere from 'components/ZkSphere'
import classnames, {
  alignItems,
  display,
  flexDirection,
  margin,
} from 'classnames/tailwind'

const innerId = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)
const identityText = classnames(margin('my-3'))
const pinkRectangle = classnames(margin('my-1.875'))
const zkSpheresRight = classnames(margin('mt-2'))

function IdentityCardTwo() {
  return (
    <Card color="white" shadow thin small>
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
        <div className={zkSpheresRight}>
          <ZkSphere color={Colors.pink} />
        </div>
      </div>
    </Card>
  )
}

export default IdentityCardTwo
