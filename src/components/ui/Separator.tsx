import { AccentText, ExtraBoldText } from 'components/ui/Text'
import ChildrenProp from 'models/ChildrenProp'
import Line from 'components/ui/Line'
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
      <Line color="accent" gradientDirection="to-right" />
      <ExtraBoldText>
        <AccentText small color="text-accent" shadow="drop-shadow-accent">
          <span className={lineHeight('leading-10')}>{children}</span>
        </AccentText>
      </ExtraBoldText>
      <Line color="accent" gradientDirection="to-left" />
    </div>
  )
}
