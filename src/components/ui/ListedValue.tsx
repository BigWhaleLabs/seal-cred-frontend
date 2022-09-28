import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import Cross from 'icons/Cross'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  cursor,
  display,
  gap,
  height,
  padding,
  textColor,
  width,
} from 'classnames/tailwind'

const valueWrapper = (alternativeStyle?: boolean, isDifferent?: boolean) =>
  classnames(
    textColor({ 'text-primary-dark': isDifferent }),
    display('flex'),
    alignItems('items-center'),
    gap('gap-x-1'),
    backgroundColor(
      isDifferent
        ? 'bg-secondary'
        : alternativeStyle
        ? 'bg-primary-semi-dimmed'
        : 'bg-primary-dimmed'
    ),
    borderRadius('rounded-3xl'),
    alignItems('items-center'),
    padding(alternativeStyle ? 'p-4' : { 'px-2': true, 'py-1': true }),
    height('h-7')
  )
const crossWrapper = classnames(width('w-4'), cursor('cursor-pointer'))

const TruncatedTitle = ({ title }: { title: string }) => (
  <>
    <div className={displayFrom('sm')}>{truncateMiddleIfNeeded(title, 16)}</div>
    <div className={displayTo('sm')}>{truncateMiddleIfNeeded(title, 12)}</div>
  </>
)

export default function ({
  title,
  index,
  removeValueFromList,
  emailsAmount,
  fileName,
  isDifferent,
}: {
  title: string
  removeValueFromList: (fileName?: string, index?: number) => void
  fileName?: string
  emailsAmount?: string
  index?: number
  isDifferent?: boolean
}) {
  return (
    <div className={valueWrapper(!!fileName, isDifferent)}>
      <TruncatedTitle title={title} />
      <div className={displayFrom('xs')}>{emailsAmount}</div>
      <div
        className={crossWrapper}
        onClick={() => removeValueFromList(fileName, index)}
      >
        <Cross inheritColor={isDifferent} />
      </div>
    </div>
  )
}
