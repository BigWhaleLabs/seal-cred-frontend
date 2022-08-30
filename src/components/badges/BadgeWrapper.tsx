import ChildrenProp from 'models/ChildrenProp'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  gridColumn,
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
    padding('px-4', 'py-4'),
    gridColumn('col-span-1', 'xl:col-span-2')
  )

export default function ({
  children,
  minted,
}: ChildrenProp & { minted: boolean }) {
  const wrapper = classNamesToString(
    badgeWrapper(minted),
    'xl:each-new-row-in-3-cols:last:col-span-full',
    'xl:each-new-row-in-3-cols:pre-last:col-span-3',
    'xl:each-2nd-element-in-3-cols:last:col-span-3',
    'smToXl:odd:last:col-span-full'
  )

  return <div className={wrapper}>{children}</div>
}
