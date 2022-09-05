import { AccentText } from 'components/ui/Text'
import Mark, { MarkType } from 'components/ui/Mark'
import ToolTip from 'components/ui/ToolTip'
import classnames, {
  alignItems,
  display,
  gap,
  margin,
} from 'classnames/tailwind'

const hintWrapper = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  gap('gap-x-1.5'),
  margin('mt-3')
)

export default function () {
  return (
    <span>
      <AccentText color="text-error">
        <ToolTip
          position="bottom"
          fitContainer
          text={
            'The wallet that’s currently linked contains the original nft. It might be best you use a different wallet.'
          }
        >
          <span className={hintWrapper}>
            <Mark medium mark={MarkType.Exclamation} />
            Wait
          </span>
        </ToolTip>
      </AccentText>
    </span>
  )
}
