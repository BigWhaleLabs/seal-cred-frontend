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
import useBreakpoints from 'hooks/useBreakpoints'

const contractContainer = (small?: boolean, breakWords?: boolean) =>
  classnames(
    display('flex'),
    flexWrap('flex-wrap'),
    flexDirection(small ? 'flex-col' : 'flex-row'),
    alignItems(small ? 'items-start' : 'items-center'),
    justifyContent('justify-between'),
    space(small ? 'space-y-1' : null),
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
  const { xs } = useBreakpoints()

  return <div className={contractContainer(xs, breakWords)}>{children}</div>
}
