import { BodyText } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import Card from 'components/ui/Card'
import ChildrenProp from 'models/ChildrenProp'
import DoubleSmile from 'icons/DoubleSmile'
import Grim from 'icons/Grin'
import NoisyRectangle from 'components/landing/NoisyRectangle'
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
}

export default function ({
  children,
  left = false,
  reveal,
  text,
}: IdentityCardProps & ChildrenProp) {
  return (
    <Card onlyWrap shadow thin color="formal-accent" paddingType="small">
      <div className={innerId}>
        <div className={rectangleMargin(left)}>
          {left ? (
            <NoisyRectangle bgColor="bg-tertiary" />
          ) : (
            <NoisyRectangle bgColor="bg-secondary" />
          )}
          {left && <NoisyRectangle bgColor="bg-accent" />}
        </div>
        <span className={displayTo('sm')}>
          <BodyText center small>
            {text}
          </BodyText>
        </span>
        <span className={displayFrom('sm')}>
          <BodyText center>{text}</BodyText>
        </span>
        {left ? <DoubleSmile /> : <Grim />}
        <div className={zkSpheresLeft(reveal)}>{children}</div>
      </div>
    </Card>
  )
}
