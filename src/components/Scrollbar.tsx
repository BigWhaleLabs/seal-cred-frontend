import { MutableRef } from 'preact/hooks'
import { lazy, useRef } from 'react'
import ChildrenProp from 'models/ChildrenProp'
import classnames, { position } from 'classnames/tailwind'
import useIsOverflow from 'hooks/useIsOverflow'

const Fade = lazy(() => import('components/Fade'))
const CustomScrollBar = lazy(() => import('components/CustomScrollBar'))

type FadeType = 'top' | 'bottom' | 'both'

const outerBox = classnames(position('relative'))

interface ScrollbarProps {
  maxHeight?: number
  fade?: FadeType
}

export default function ({
  children,
  maxHeight = 350,
  fade = 'both',
}: ChildrenProp & ScrollbarProps) {
  const scrollRef = useRef() as MutableRef<HTMLDivElement>
  const { isOnTop, isOnBottom } = useIsOverflow(scrollRef, maxHeight)

  return (
    <div className={outerBox}>
      {isOnTop && (fade === 'both' || fade === 'top') && <Fade />}
      <CustomScrollBar maxHeight={maxHeight} scrollRef={scrollRef}>
        {children}
      </CustomScrollBar>
      {isOnBottom && (fade === 'both' || fade === 'bottom') && <Fade bottom />}
    </div>
  )
}
