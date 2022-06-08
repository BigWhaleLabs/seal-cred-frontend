import { JSX } from 'preact'
import { useLayoutEffect, useRef, useState } from 'react'

export default function Measure({
  children,
  className,
  defaultHeight = 0,
}: {
  defaultHeight?: number
  className?: string
  children: (args: { height: number }) => JSX.Element
}) {
  const container = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(defaultHeight)

  useLayoutEffect(() => {
    if (container.current) {
      setHeight(container.current.offsetHeight)
    }
  }, [])

  return (
    <div ref={container} className={className}>
      {children({ height })}
    </div>
  )
}
