import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  flexWrap,
  fontSize,
  fontWeight,
  height,
  justifyContent,
  padding,
  space,
  width,
  wordBreak,
} from 'classnames/tailwind'

const contractContainer = (breakWords?: boolean) =>
  classnames(
    display('flex'),
    flexWrap('flex-wrap'),
    flexDirection('flex-col', 'xs:flex-row'),
    alignItems('items-start', 'xs:items-center'),
    justifyContent('justify-between'),
    space('space-y-1', 'xs:space-y-0', 'xs:space-x-2'),
    backgroundColor('bg-primary-dimmed'),
    borderRadius('rounded-lg'),
    height('h-fit'),
    padding('px-4', 'py-2'),
    width('w-full'),
    fontSize('text-sm'),
    fontWeight('font-bold'),
    wordBreak(breakWords ? 'break-words' : 'break-all')
  )

export default function ({
  children,
  breakWords,
}: ChildrenProp & { breakWords?: boolean }) {
  return <div className={contractContainer(breakWords)}>{children}</div>
}
