import { FC } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import React from 'react'
import classnames, {
  backgroundColor,
  borderRadius,
  dropShadow,
  inset,
  width,
} from 'classnames/tailwind'

interface ScrollStyleProps {
  style: React.CSSProperties | undefined
  props: unknown
}

const renderThumb = ({ style, ...props }: ScrollStyleProps) => {
  const thumbStyle = {
    ...style,
    width: 8,
    left: -4,
  }
  const thumbNames = classnames(
    borderRadius('rounded-3xl'),
    backgroundColor('bg-yellow'),
    width('w-2.5'),
    dropShadow('drop-shadow-yellow')
  )

  return <div style={thumbStyle} className={thumbNames} {...props} />
}

const renderTrack = ({ style, ...props }: ScrollStyleProps) => {
  const trackStyle = {
    ...style,
    width: 1,
  }
  const trackNames = classnames(
    inset('right-3', 'bottom-1', 'top-1'),
    backgroundColor('bg-yellow')
  )

  return <div style={trackStyle} className={trackNames} {...props} />
}

const CustomScrollbar: FC<{ height?: number }> = ({
  children,
  height = 350,
}) => {
  return (
    <Scrollbars
      autoHeight
      autoHeightMin={height}
      autoHide
      renderThumbVertical={renderThumb}
      renderTrackVertical={renderTrack}
    >
      {children}
    </Scrollbars>
  )
}

export default CustomScrollbar
