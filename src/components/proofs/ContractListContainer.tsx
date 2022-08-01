import { Ref } from 'preact'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import ChildrenProp from 'models/ChildrenProp'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-2')
)

export default function ({ children }: ChildrenProp) {
  const listRef = useAutoAnimate({})
  return (
    <div className={container} ref={listRef as Ref<HTMLDivElement>}>
      {children}
    </div>
  )
}
