import { AccentText } from 'components/ui/Text'
import CharInCircle from 'components/ui/CharInCircle'
import Sizes from 'models/MarkSizes'
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
    <AccentText color="text-error">
      <ToolTip
        fitContainer
        position="bottom"
        text="The wallet that’s currently linked contains the original nft. It might be best you use a different wallet."
      >
        <span className={hintWrapper}>
          <CharInCircle char="!" size={Sizes.Medium} />
          Wait
        </span>
      </ToolTip>
    </AccentText>
  )
}
