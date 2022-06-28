import { HighlightedText } from 'components/Text'
import { JSXInternal } from 'preact/src/jsx'
import { MutableRef, useEffect } from 'preact/hooks'
import { createPortal, useRef } from 'react'
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

const tooltip = (fitContainer?: boolean) =>
  classnames(
    position('relative'),
    width('w-full', fitContainer ? undefined : 'sm:w-card')
  )
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
  fitContainer,
  children,
}: ChildrenProp & {
  text: string
  position: 'top' | 'bottom' | 'floating'
  arrow?: boolean
  fitContainer?: boolean
}) {
  const [isShow, setIsShow] = useState(false)
  const childrenRef = useRef() as MutableRef<HTMLDivElement>
  const { xs } = useBreakpoints()
  useClickOutside(childrenRef, () => setIsShow(false))

  const [node, setNode] = useState<any>(null)

  useEffect(() => {
    setIsShow(!!node)
  }, [node])

  const positionTooltip = (
    e: JSXInternal.TargetedMouseEvent<HTMLDivElement>
  ) => {
    if (position !== 'floating') {
      return
    }
    const x = e.clientX
    const y = e.clientY
    const el = document.getElementById('root')
    const positionX = (xs ? x * 0.5 : x * 0.95) + 'px;'
    const positionY = y + 0.5 + 'px;'

    const classLove = width('lg:w-card', 'w-6/12')

    const stylestring =
      `position:absolute; z-index: 999;` +
      'left:' +
      positionX +
      'top:' +
      positionY

    if (!el) return

    const node = createPortal(
      <div
        style={stylestring}
        className={classLove}
        id="floatingTooltip"
        ref={childrenRef}
      >
        <div className={tooltipWrapper}>
          <div
            className={tooltipClasses(xs, isShow, 'bottom')}
            style={{ visibility: isShow ? 'visible' : 'collapse' }}
          >
            <HighlightedText>{text}</HighlightedText>
            {arrow && <div className={triangle('bottom')} />}
          </div>
        </div>
      </div>,
      el
    )
    setNode(node)
  }

  return (
    <div id="questionMark" className={tooltip(fitContainer)}>
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
      {position === 'floating' ? (
        <div
          ref={childrenRef}
          className={tooltipChildrenWrapper}
          onMouseMove={(e) => {
            positionTooltip(e)
            setIsShow(true)
          }}
          onMouseEnter={(e) => {
            positionTooltip(e)
            // setIsShow(true)
          }}
          onMouseLeave={() => {
            setNode(null)
            // setIsShow(false)
          }}
          onClick={() => setIsShow(true)}
        >
          {children}
        </div>
      ) : (
        <div
          ref={childrenRef}
          className={tooltipChildrenWrapper}
          onMouseEnter={() => setIsShow(true)}
          onMouseLeave={() => setIsShow(false)}
          onClick={() => setIsShow(true)}
        >
          {children}
        </div>
      )}
      {node}
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
