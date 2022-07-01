import 'use-scroll-shadow/lib/index.css'
import { RefObject } from 'preact'
import { overflow } from 'classnames/tailwind'
import { useScrollShadow } from 'use-scroll-shadow'
import ChildrenProp from 'models/ChildrenProp'

export default function ({ children }: ChildrenProp) {
  const { elementRef } = useScrollShadow()

  return (
    <div
      className={overflow('overflow-y-auto')}
      ref={elementRef as RefObject<HTMLDivElement>}
    >
      {children}
    </div>
  )
}
