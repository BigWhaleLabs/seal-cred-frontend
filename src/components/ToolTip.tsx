import { HighlightedText } from 'components/Text'
import { MutableRef } from 'preact/hooks'
import { useRef } from 'react'
import { useState } from 'preact/hooks'
import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  backgroundColor,
  borderRadius,
  height,
  inset,
  margin,
  opacity,
  padding,
  position,
  rotate,
  transformOrigin,
  transitionDuration,
  transitionProperty,
  translate,
  width,
  zIndex,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'
import useClickOutside from 'hooks/useClickOutside'

const tooltip = classnames(position('relative'), width('w-full', 'sm:w-card'))
const tooltipWrapper = classnames(
  position('relative'),
  height('h-px'),
  width('w-full'),
  margin('mx-auto')
)
const tooltipChildrenWrapper = width('w-full')

const tooltipClasses = (
  mobile: boolean,
  show: boolean,
  placeOn: 'top' | 'bottom'
) => {
  return classnames(
    position('absolute'),
    backgroundColor('bg-formal-accent'),
    inset(
      mobile ? 'left-0' : 'left-3',
      mobile ? 'right-0' : 'right-3',
      placeOn === 'top' ? 'bottom-4' : 'top-4'
    ),
    padding('py-2', 'px-5'),
    zIndex('z-50'),
    borderRadius('rounded-lg'),
    opacity(show ? 'opacity-100' : 'opacity-0'),
    transitionDuration('duration-500'),
    transitionProperty('transition-opacity')
  )
}
const triangle = (placeOn: 'top' | 'bottom') =>
  classnames(
    position('absolute'),
    height('h-2'),
    width('w-2'),
    rotate('rotate-45'),
    translate(
      '-translate-x-5.5',
      placeOn === 'bottom' ? '-translate-y-7' : undefined
    ),
    inset(placeOn === 'top' ? 'bottom-0' : 'top-0', 'inset-x-1/2'),
    backgroundColor('bg-formal-accent'),
    transformOrigin('origin-bottom-left')
  )

export default function ({
  text,
  position,
  arrow,
  children,
}: ChildrenProp & {
  text: string
  position: 'top' | 'bottom'
  arrow?: boolean
}) {
  const [isShow, setIsShow] = useState(false)
  const childrenRef = useRef() as MutableRef<HTMLDivElement>
  const { xs } = useBreakpoints()
  useClickOutside(childrenRef, () => setIsShow(false))

  return (
    <div className={tooltip}>
      {position === 'top' && (
        <div className={tooltipWrapper}>
          <div
            className={tooltipClasses(xs, isShow, position)}
            style={{ visibility: isShow ? 'visible' : 'collapse' }}
          >
            <HighlightedText>{text}</HighlightedText>
            {arrow && <div className={triangle(position)} />}
          </div>
        </div>
      )}
      <div
        ref={childrenRef}
        className={tooltipChildrenWrapper}
        onMouseEnter={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
        onClick={() => setIsShow(true)}
      >
        {children}
      </div>
      {position === 'bottom' && (
        <div className={tooltipWrapper}>
          <div
            className={tooltipClasses(xs, isShow, position)}
            style={{ visibility: isShow ? 'visible' : 'collapse' }}
          >
            <HighlightedText>{text}</HighlightedText>
            {arrow && <div className={triangle(position)} />}
          </div>
        </div>
      )}
    </div>
  )
}
