import { FC } from 'react'
import Fade from 'components/Fade'
import classnames, {
  TMaxHeight,
  height,
  margin,
  maxHeight,
  overflow,
  position,
} from 'classnames/tailwind'

type FadeType = 'top' | 'bottom' | 'both'

const containerWrapper = (blockHeight: TMaxHeight, fade: FadeType) =>
  classnames(
    position('relative'),
    fade === 'both' ? margin('!mt-2') : null,
    height('h-fit'),
    maxHeight(blockHeight),
    overflow('overflow-y-auto', 'overflow-x-hidden')
  )

const ScrollableBlock: FC<{ maxHeight?: TMaxHeight; fade?: FadeType }> = ({
  maxHeight,
  fade = 'both',
  children,
}) => {
  return (
    <div className={containerWrapper(maxHeight || 'max-h-80', fade)}>
      {(fade === 'both' || fade === 'top') && <Fade />}
      {children}
      {(fade === 'both' || fade === 'bottom') && <Fade bottom />}
    </div>
  )
}

export default ScrollableBlock
