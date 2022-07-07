import { AccentText, ExtraBoldText } from 'components/Text'
import ChildrenProp from 'models/ChildrenProp'
import Color from 'models/Color'
import Line from 'components/Line'
import classnames, {
  alignItems,
  display,
  justifyContent,
  lineHeight,
  space,
} from 'classnames/tailwind'

const lineBlockWrapper = classnames(
  display('flex'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  space('space-x-3')
)

export default function ({ children, color }: ChildrenProp & { color: Color }) {
  return (
    <div className={lineBlockWrapper}>
      <Line color={color} gradientDirection="to-right" />
      <ExtraBoldText>
        <AccentText
          small
          color={`text-${color}`}
          shadow={`drop-shadow-${color}`}
        >
          <span className={lineHeight('leading-10')}>{children}</span>
        </AccentText>
      </ExtraBoldText>
      <Line color={color} gradientDirection="to-left" />
    </div>
  )
}
