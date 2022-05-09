import 'simplebar/dist/simplebar.min.css'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import SimpleBar from 'simplebar-react'
import classnames, {
  THeight,
  height,
  margin,
  transitionProperty,
} from 'classnames/tailwind'
import isOverflowing from 'helpers/isOverflowing'

interface ScrollbarProps {
  mobileHeight?: THeight
  maxHeight?: number
}

const container = (mobileHeight?: THeight, overflows?: boolean) =>
  classnames(
    overflows ? margin('mr-5') : undefined,
    height('lg:h-80', mobileHeight),
    transitionProperty('transition-all')
  )

const CustomScrollbar: FC<ScrollbarProps> = ({
  children,
  mobileHeight = 'h-80',
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
      <div ref={boxRef} className={container(mobileHeight, overflows)}>
        {children}
      </div>
    </SimpleBar>
  )
}

export default CustomScrollbar
