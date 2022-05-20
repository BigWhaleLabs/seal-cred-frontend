import 'simplebar/dist/simplebar.min.css'
import { MutableRefObject, ReactNode, lazy, useRef } from 'react'
import classnames, { margin, transitionProperty } from 'classnames/tailwind'
import useIsOverflow from 'hooks/useIsOverflow'

const SimpleBar = lazy(() => import('simplebar-react'))

interface CustomScrollBarProps {
  children: ReactNode
  scrollRef: MutableRefObject<HTMLDivElement>
  maxHeight: number
}

export default function ({
  children,
  scrollRef,
  maxHeight,
}: CustomScrollBarProps) {
  const wrapRef = useRef() as MutableRefObject<HTMLDivElement>

  const { overflows, scrollMaxHeight } = useIsOverflow(scrollRef, maxHeight)

  const wrapperStyle = (overflows: boolean) =>
    classnames(
      overflows ? margin('mr-5') : undefined,
      transitionProperty('transition-all')
    )

  return (
    <SimpleBar
      style={{ maxHeight: scrollMaxHeight }}
      scrollableNodeProps={{ ref: scrollRef }}
    >
      <div ref={wrapRef} className={wrapperStyle(overflows)}>
        {children}
      </div>
    </SimpleBar>
  )
}
