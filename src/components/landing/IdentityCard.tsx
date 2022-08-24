import { BodyText } from 'components/ui/Text'
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
import useBreakpoints from 'hooks/useBreakpoints'

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
  reveal,
  left = false,
  text,
  children,
}: IdentityCardProps & ChildrenProp) {
  const { xs } = useBreakpoints()
  return (
    <Card color="formal-accent" shadow thin paddingType="small" onlyWrap>
      <div className={innerId}>
        <div className={rectangleMargin(left)}>
          {left ? (
            <NoisyRectangle bgColor="bg-tertiary" />
          ) : (
            <NoisyRectangle bgColor="bg-secondary" />
          )}
          {left && <NoisyRectangle bgColor="bg-accent" />}
        </div>
        <BodyText small={xs} center>
          {text}
        </BodyText>
        {left ? <DoubleSmile /> : <Grim />}
        <div className={zkSpheresLeft(reveal)}>{children}</div>
      </div>
    </Card>
  )
}
