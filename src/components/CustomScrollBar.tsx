import 'simplebar/dist/simplebar.min.css'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import SimpleBar from 'simplebar-react'
import classnames, {
  height,
  margin,
  transitionProperty,
} from 'classnames/tailwind'
import isOverflowing from 'helpers/isOverflowing'

const container = (overflows?: boolean) =>
  classnames(
    overflows ? margin('mr-5') : undefined,
    height('h-80'),
    transitionProperty('transition-all')
  )

const CustomScrollbar: FC<{ maxHeight?: number }> = ({
  children,
  maxHeight = 350,
}) => {
  const boxRef = useRef() as MutableRefObject<HTMLDivElement>
  const [overflows, setOverflows] = useState(false)

  useEffect(() => {
    const current = boxRef.current
    if (current) setOverflows(isOverflowing(boxRef.current))
  }, [boxRef])

  return (
    <SimpleBar style={{ maxHeight }}>
      <div ref={boxRef} className={container(overflows)}>
        {children}
      </div>
    </SimpleBar>
  )
}

export default CustomScrollbar
