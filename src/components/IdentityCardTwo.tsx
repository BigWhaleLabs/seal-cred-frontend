import { BodyText } from 'components/Text'
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
const secondaryRectangle = classnames(margin('my-7.5'))
const zkSpheresRight = (reveal?: boolean) =>
  classnames(
    margin('my-2'),
    opacity(reveal ? 'opacity-100' : 'opacity-0'),
    transitionProperty('transition-all')
  )

export default function IdentityCardTwo({ reveal }: { reveal?: boolean }) {
  return (
    <Card color="white" shadow thin small onlyWrap>
      <div className={innerId}>
        <div className={secondaryRectangle}>
          <NoisyRectangle bgColor="bg-secondary" />
        </div>
        <div className={identityText}>
          <BodyText size="base" center>
            Identity-02
          </BodyText>
        </div>
        <Grim />
        <div className={zkSpheresRight(reveal)}>
          <ZkSphere text="ZK" color={Colors.secondary} />
        </div>
      </div>
    </Card>
  )
}
