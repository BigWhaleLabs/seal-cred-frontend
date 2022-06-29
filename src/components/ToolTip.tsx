import { HighlightedText } from 'components/Text'
import { MutableRef, useCallback, useEffect } from 'preact/hooks'
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
    width('w-full', fitContainer ? undefined : 'sm:w-card'),
    zIndex('z-30')
  )
const tooltipWrapper = classnames(
  position('relative'),
  height('h-px'),
  width('w-full'),
  margin('mx-auto')
)
const tooltipChildrenWrapper = classnames(width('w-full'), zIndex('z-10'))

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

  const positionTooltip = useCallback(
    (event: MouseEvent) => {
      if (position !== 'floating') return

      const x = event.pageX
      const y = event.pageY
      const element = document.getElementById('root')
      const parent = childrenRef.current
      const positionX = (xs ? 0 : x * 0.95) + 'px;'
      const positionY = y + 0.5 + 'px;'
      const portalWrapper = width('lg:w-card', xs ? 'w-full' : 'w-6/12')

      const portalStyles =
        `position:absolute; z-index: 49;` +
        'left:' +
        positionX +
        'top:' +
        positionY

      if (!parent) return
      const parentXStart = parent.getBoundingClientRect().left + window.scrollX
      const parentXEnd = parentXStart + parent.offsetWidth
      const parentYStart = parent.getBoundingClientRect().top + window.scrollY
      const parentYEnd = parentYStart + parent.offsetHeight
      if (!element) return

      if (
        x < parentXStart ||
        x > parentXEnd ||
        y < parentYStart ||
        y > parentYEnd
      ) {
        setIsShow(false)
        setNode(null)
        return
      }

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
      setIsShow(true)
      setNode(node)
    },
    [arrow, isShow, xs, position, text]
  )

  const isFloating = position === 'floating'

  useEffect(() => {
    if (!isFloating) return
    const element = childrenRef.current
    if (!element) return

    document.addEventListener('mouseover', positionTooltip)
    document.addEventListener('mouseout', positionTooltip)
    document.addEventListener('click', positionTooltip)

    return () => {
      if (!isFloating) return
      document.removeEventListener('mouseover', positionTooltip)
      document.addEventListener('mouseout', positionTooltip)
      document.addEventListener('click', positionTooltip)
    }
  }, [isFloating, positionTooltip])

  return (
    <div className={tooltip(fitContainer)} ref={childrenRef}>
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
          <div ref={childrenRef} className={tooltipChildrenWrapper}>
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
