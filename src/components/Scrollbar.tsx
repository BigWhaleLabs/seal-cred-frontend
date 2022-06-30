import { MutableRef, useEffect, useState } from 'preact/hooks'
import { useRef } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import ChildrenProp from 'models/ChildrenProp'
import Fade from 'components/Fade'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  display,
  flexDirection,
  flexGrow,
  overflow,
  position,
} from 'classnames/tailwind'
import useIsOverflow from 'hooks/useIsOverflow'

type FadeType = 'top' | 'bottom' | 'both'

interface ScrollbarProps {
  fade?: FadeType
  parentHeight?: number
  bottomPadding?: number
  titlePadding?: number
}

export default function ({
  children,
  fade = 'both',
  parentHeight = 0,
  bottomPadding = 0,
  titlePadding = 0,
}: ChildrenProp & ScrollbarProps) {
  const { height = 0, ref } = useResizeDetector({ handleWidth: false })
  const maximumHeightSize = 370 // the maximum height of the block by design

  const extaBottomPadding = parentHeight > maximumHeightSize ? bottomPadding : 0
  const extaTitlePadding = titlePadding
  const extraReservedSpace = extaBottomPadding + extaTitlePadding

  const { isOnTop, isOnBottom, wrapperRef } = useIsOverflow(
    ref,
    height - extraReservedSpace
  )

  return (
    <div ref={wrapperRef}>
      {isOnTop && (fade === 'both' || fade === 'top') && <Fade />}
      {children}
      {isOnBottom && (fade === 'both' || fade === 'bottom') && <Fade bottom />}
    </div>
  )
}
