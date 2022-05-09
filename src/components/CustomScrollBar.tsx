import { FC } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import React from 'react'

interface ScrollStyleProps {
  style: React.CSSProperties | undefined
  props: unknown
}

const renderThumb = ({ style, ...props }: ScrollStyleProps) => {
  const thumbStyle = {
    ...style,
    borderRadius: 50,
    backgroundColor: '#fed823',
    width: '8px',
    left: '-4px',
    filter: 'drop-shadow(0px 0px 10px #fed823)',
  }
  return <div style={thumbStyle} {...props} />
}

const renderTrack = ({ style, ...props }: ScrollStyleProps) => {
  const trackStyle = {
    ...style,
    right: 8,
    bottom: 2,
    top: 2,
    backgroundColor: '#fed823',
    width: '1px',
  }

  return <div style={trackStyle} {...props} />
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
