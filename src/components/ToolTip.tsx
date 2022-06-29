import { HighlightedText } from 'components/Text'
import { MutableRef, useEffect } from 'preact/hooks'
import { VNode } from 'preact'
import { createPortal, useRef } from 'preact/compat'
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
  userSelect,
  width,
  zIndex,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'
import useClickOutside from 'hooks/useClickOutside'

const tooltip = (fitContainer?: boolean) =>
  classnames(
    position('relative'),
    userSelect('select-none'),
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
  disabled,
}: ChildrenProp & {
  text: string
  position: 'top' | 'bottom' | 'floating'
  arrow?: boolean
  fitContainer?: boolean
  disabled?: boolean
}) {
  if (disabled) return <>{children}</>

  const [isShow, setIsShow] = useState(false)
  const childrenRef = useRef() as MutableRef<HTMLDivElement>
  const { xs } = useBreakpoints()
  useClickOutside(childrenRef, () => setIsShow(false))

  const [node, setNode] = useState<VNode | null>(null)

  useEffect(() => {
    setIsShow(!!node)
  }, [node])

  const positionTooltip = (event: MouseEvent) => {
    if (position !== 'floating') return

    const x = event.pageX
    const y = event.pageY
    const element = document.getElementById('root')
    const positionX = (xs ? x * 0.5 : x * 0.95) + 'px;'
    const positionY = y + 0.5 + 'px;'

    const portalWrapper = width('lg:w-card', 'w-6/12')

    const portalStyles =
      `position:absolute; z-index: 49;` +
      'left:' +
      positionX +
      'top:' +
      positionY

    if (!element) return

    const node = createPortal(
      <div style={portalStyles} className={portalWrapper}>
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
      element
    )
    setNode(node)
  }
  const recalculatePosition = (e: MouseEvent, isClick?: boolean) => {
    positionTooltip(e)
    setIsShow(isClick ? !isShow : true)
  }

  return (
    <div id="questionMark" className={tooltip(fitContainer)} ref={childrenRef}>
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
        <>
          <div
            ref={childrenRef}
            className={tooltipChildrenWrapper}
            onMouseMove={(e) => recalculatePosition(e)}
            onMouseEnter={(e) => positionTooltip(e)}
            onMouseLeave={() => setNode(null)}
            onClick={(e) => recalculatePosition(e, true)}
          >
            {children}
          </div>
          {node}
        </>
      ) : (
        <div
          ref={childrenRef}
          className={tooltipChildrenWrapper}
          onMouseEnter={() => setIsShow(true)}
          onMouseLeave={() => setIsShow(false)}
          onClick={() => setIsShow(!isShow)}
        >
          {children}
        </div>
      )}

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
