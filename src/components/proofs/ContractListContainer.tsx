import ChildrenProp from 'models/ChildrenProp'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'
import useAutoAnimate from 'hooks/useAutoAnimate'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-2')
)

export default function ({ children }: ChildrenProp) {
  const [listRef] = useAutoAnimate<HTMLDivElement>()

  return (
    <div className={container} ref={listRef}>
      {children}
    </div>
  )
}
