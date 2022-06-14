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

const zkProofButtonTooltip = classnames(
  position('relative'),
  width('w-full', 'sm:w-card')
)
const tooltipWrapper = classnames(
  position('relative'),
  height('h-px'),
  width('w-full'),
  margin('mx-auto')
)

const tooltipClasses = (mobile: boolean, show: boolean) => {
  return classnames(
    position('absolute'),
    backgroundColor('bg-formal-accent'),
    inset(mobile ? 'left-0' : 'left-3', mobile ? 'right-0' : 'right-3'),
    inset('bottom-4'),
    padding('py-2', 'px-5'),
    margin('!ml-0'),
    zIndex('z-50'),
    borderRadius('!rounded-lg'),
    opacity(show ? 'opacity-100' : 'opacity-0'),
    transitionDuration('duration-500'),
    transitionProperty('transition-opacity')
  )
}
const triangle = classnames(
  position('absolute'),
  height('h-2'),
  width('w-2'),
  rotate('rotate-45'),
  translate('-translate-x-5.5'),
  inset('bottom-0', 'inset-x-1/2'),
  backgroundColor('bg-formal-accent'),
  transformOrigin('origin-bottom-left')
)

export default function ({ text, children }: ChildrenProp & { text: string }) {
  const [isShow, setIsShow] = useState(false)
  const childrenRef = useRef() as MutableRef<HTMLDivElement>
  const { xs } = useBreakpoints()
  useClickOutside(childrenRef, () => setIsShow(false))

  return (
    <div className={zkProofButtonTooltip}>
      <div className={tooltipWrapper}>
        <div
          className={tooltipClasses(xs, isShow)}
          style={{ visibility: isShow ? 'visible' : 'collapse' }}
        >
          <HighlightedText>{text}</HighlightedText>
          <div className={triangle}></div>
        </div>
      </div>
      <div
        ref={childrenRef}
        className={width('w-full')}
        onMouseEnter={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
        onClick={() => setIsShow(true)}
      >
        {children}
      </div>
    </div>
  )
}
