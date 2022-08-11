import ChildrenProp from 'models/ChildrenProp'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  justifyContent,
  padding,
  space,
} from 'classnames/tailwind'

const badgeWrapper = (minted: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    justifyContent(minted ? 'justify-start' : 'justify-center'),
    space('space-y-2'),
    alignItems('items-center'),
    borderRadius('rounded-lg'),
    backgroundColor(minted ? 'bg-primary-dimmed' : 'bg-primary-background'),
    padding('px-4', 'py-4')
  )

export default function ({
  children,
  minted,
}: ChildrenProp & { minted: boolean }) {
  return (
    <div
      className={classNamesToString(
        badgeWrapper(minted),
        'last:odd:col-span-full'
      )}
    >
      {children}
    </div>
  )
}
