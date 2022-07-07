import { AccentText, ExtraBoldText } from 'components/Text'
import ChildrenProp from 'models/ChildrenProp'
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

export default function ({ children }: ChildrenProp) {
  return (
    <div className={lineBlockWrapper}>
      <Line color="secondary" gradientDirection="to-right" />
      <ExtraBoldText>
        <AccentText small color="text-secondary" shadow="drop-shadow-secondary">
          <span className={lineHeight('leading-10')}>{children}</span>
        </AccentText>
      </ExtraBoldText>
      <Line color="secondary" gradientDirection="to-left" />
    </div>
  )
}
