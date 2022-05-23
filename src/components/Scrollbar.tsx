import { MutableRef } from 'preact/hooks'
import { position } from 'classnames/tailwind'
import { useRef } from 'react'
import ChildrenProp from 'models/ChildrenProp'
import CustomScrollBar from 'components/CustomScrollBar'
import Fade from 'components/Fade'
import useIsOverflow from 'hooks/useIsOverflow'

type FadeType = 'top' | 'bottom' | 'both'

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
    <div className={position('relative')}>
      <CustomScrollBar maxHeight={maxHeight}>
        {isOnTop && (fade === 'both' || fade === 'top') && <Fade />}
        {children}
        {isOnBottom && (fade === 'both' || fade === 'bottom') && (
          <Fade bottom />
        )}
      </CustomScrollBar>
    </div>
  )
}
