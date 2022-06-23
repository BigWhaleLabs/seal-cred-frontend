import ChildrenProp from 'models/ChildrenProp'
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
import useBreakpoints from 'hooks/useBreakpoints'

const badgeWrapper = (minted: boolean, small?: boolean) =>
  classnames(
    display('flex'),
    flexDirection(
      minted ? (small ? 'flex-col' : 'flex-row') : 'flex-col',
      'lg:flex-col'
    ),
    justifyContent(minted ? 'justify-start' : 'justify-center'),
    space(
      minted ? (small ? 'space-y-2' : 'space-x-2') : 'space-y-2',
      minted ? 'lg:space-x-0' : undefined,
      'lg:space-y-2'
    ),
    alignItems('items-center'),
    borderRadius('rounded-lg'),
    backgroundColor(minted ? 'bg-primary-dimmed' : 'bg-primary-background'),
    padding('px-4', 'py-4')
  )

export default function ({
  children,
  minted = false,
}: ChildrenProp & { minted?: boolean }) {
  const { xxs, sm } = useBreakpoints()
  return <div className={badgeWrapper(minted, xxs && !sm)}>{children}</div>
}
