import 'simplebar/dist/simplebar.min.css'
import { MutableRef } from 'preact/hooks'
import { useRef } from 'react'
import ChildrenProp from 'models/ChildrenProp'
import SimpleBar from 'simplebar-react'
import classnames, { margin, transitionProperty } from 'classnames/tailwind'
import useIsOverflow from 'hooks/useIsOverflow'

interface CustomScrollBarProps {
  scrollRef: MutableRef<HTMLDivElement>
  maxHeight: number
}

export default function ({
  children,
  scrollRef,
  maxHeight,
}: ChildrenProp & CustomScrollBarProps) {
  const wrapRef = useRef() as MutableRef<HTMLDivElement>

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
