import { BodyText } from 'components/Text'
import Card from 'components/Card'
import DoubleSmile from 'icons/DoubleSmile'
import IdRectangle from 'components/NoisyRectangle'
import classnames, {
  alignItems,
  display,
  flexDirection,
  height,
  margin,
  space,
  width,
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
  margin('my-2'),
  width('w-8'),
  height('h-8')
)

function IdentityCardOne() {
  return (
    <Card color="white" shadow thin small onlyWrap>
      <div className={innerId}>
        <div className={greenRectangle}>
          <IdRectangle bgColor="bg-green" />
        </div>
        <IdRectangle bgColor="bg-yellow" />
        <div className={identityText}>
          <BodyText size="base" center>
            Identity-01
          </BodyText>
        </div>
        <DoubleSmile />
        <div className={zkSpheresLeft} />
      </div>
    </Card>
  )
}

export default IdentityCardOne
