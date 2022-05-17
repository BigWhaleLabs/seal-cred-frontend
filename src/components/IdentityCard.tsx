import { BodyText } from 'components/Text'
import { ReactNode } from 'react'
import Card from 'components/Card'
import DoubleSmile from 'icons/DoubleSmile'
import Grim from 'icons/Grin'
import NoisyRectangle from 'components/NoisyRectangle'
import classnames, {
  alignItems,
  display,
  flexDirection,
  margin,
  opacity,
  overflow,
  space,
  transitionDuration,
  transitionProperty,
} from 'classnames/tailwind'

const innerId = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  overflow('overflow-hidden')
)
const rectangleMargin = (left: boolean) =>
  classnames(margin(left ? 'my-1' : 'my-7.5'))
const identityText = classnames(margin('my-3'))
const zkSpheresLeft = (reveal?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    space('space-x-2'),
    margin('my-2'),
    opacity(reveal ? 'opacity-100' : 'opacity-0'),
    transitionProperty('transition-opacity'),
    transitionDuration('duration-300')
  )

interface IdentityCardOneProps {
  children: ReactNode
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
}: IdentityCardOneProps) {
  return (
    <Card color="white" shadow thin small onlyWrap>
      <div className={innerId}>
        <div className={rectangleMargin(left)}>
          {left ? (
            <NoisyRectangle bgColor="bg-tertiary" />
          ) : (
            <NoisyRectangle bgColor="bg-secondary" />
          )}
        </div>
        {left && <NoisyRectangle bgColor="bg-accent" />}
        <div className={identityText}>
          <BodyText size={mobile ? 'sm' : 'base'} center>
            {text}
          </BodyText>
        </div>
        {left ? <DoubleSmile /> : <Grim />}
        <div className={zkSpheresLeft(reveal)}>{children}</div>
      </div>
    </Card>
  )
}
