import { BodyText } from 'components/Text'
import Card from 'components/Card'
import Grim from 'icons/Grin'
import IdRectangle from 'components/NoisyRectangle'
import classnames, {
  alignItems,
  display,
  flexDirection,
  height,
  margin,
  width,
} from 'classnames/tailwind'

const innerId = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)
const identityText = classnames(margin('my-3'))
const pinkRectangle = classnames(margin('my-1.875'))
const zkSpheresRight = classnames(margin('my-2'), height('h-8'), width('w-8'))

function IdentityCardTwo() {
  return (
    <Card color="white" shadow thin small onlyWrap>
      <div className={innerId}>
        <div className={pinkRectangle}>
          <IdRectangle bgColor="bg-pink" />
        </div>
        <div className={identityText}>
          <BodyText size="base" center>
            Identity-02
          </BodyText>
        </div>
        <Grim />
        <div className={zkSpheresRight} />
      </div>
    </Card>
  )
}

export default IdentityCardTwo
