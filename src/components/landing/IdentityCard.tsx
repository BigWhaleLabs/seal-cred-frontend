import { BodyText } from 'components/Text'
import Card from 'components/Card'
import ChildrenProp from 'models/ChildrenProp'
import DoubleSmile from 'icons/DoubleSmile'
import Grim from 'icons/Grin'
import NoisyRectangle from 'components/NoisyRectangle'
import classnames, {
  alignItems,
  display,
  flexDirection,
  margin,
  opacity,
  space,
  transitionDuration,
  transitionProperty,
} from 'classnames/tailwind'

const innerId = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  space('space-y-3')
)
const rectangleMargin = (left: boolean) =>
  classnames(left ? space('space-y-1') : margin('my-7.5'))
const zkSpheresLeft = (reveal?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    space('space-x-2'),
    opacity(reveal ? 'opacity-100' : 'opacity-0'),
    transitionProperty('transition-opacity'),
    transitionDuration('duration-300')
  )

interface IdentityCardProps {
  reveal?: boolean
  left?: boolean
  text: string
  mobile?: boolean
}

export default function ({
  reveal,
  left = false,
  text,
  mobile,
  children,
}: IdentityCardProps & ChildrenProp) {
  return (
    <Card color="formal-accent" shadow thin small onlyWrap>
      <div className={innerId}>
        <div className={rectangleMargin(left)}>
          {left ? (
            <NoisyRectangle bgColor="bg-tertiary" />
          ) : (
            <NoisyRectangle bgColor="bg-secondary" />
          )}
          {left && <NoisyRectangle bgColor="bg-accent" />}
        </div>
        <BodyText small={mobile} center>
          {text}
        </BodyText>
        {left ? <DoubleSmile /> : <Grim />}
        <div className={zkSpheresLeft(reveal)}>{children}</div>
      </div>
    </Card>
  )
}
