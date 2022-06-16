import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  flexWrap,
  height,
  justifyContent,
  padding,
  space,
  width,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const contractContainer = (small?: boolean) =>
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
    width('w-full')
  )

export default function ({ children }: ChildrenProp) {
  const { xs } = useBreakpoints()

  return <div className={contractContainer(xs)}>{children}</div>
}