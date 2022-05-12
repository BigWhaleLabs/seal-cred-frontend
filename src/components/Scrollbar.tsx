import 'simplebar/dist/simplebar.min.css'
import { FC, MutableRefObject, useRef } from 'react'
import SimpleBar from 'simplebar-react'
import classnames, { margin, transitionProperty } from 'classnames/tailwind'
import useIsOverflow from 'helpers/useIsOverflow'

const Scrollbar: FC<{ maxHeight?: number }> = ({
  children,
  maxHeight = 350,
}) => {
  const wrapRef = useRef() as MutableRefObject<HTMLDivElement>
  const overflows = useIsOverflow(wrapRef)

  const wrapperStyle = (overflows: boolean) =>
    classnames(
      overflows ? margin('mr-5') : undefined,
      transitionProperty('transition-all')
    )

  return (
    <SimpleBar style={{ maxHeight }}>
      <div ref={wrapRef} className={wrapperStyle(overflows)}>
        {children}
      </div>
    </SimpleBar>
  )
}

export default Scrollbar
