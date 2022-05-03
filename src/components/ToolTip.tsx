import { FC } from 'react'
import { TooltipText } from 'components/Text'
import { maxWidth } from 'classnames/tailwind'
import ReactTooltip, { Place } from 'react-tooltip'

const ToolTip: FC<{
  place: Place
  dataFor: string
  clickable?: boolean
}> = ({ place, dataFor, clickable }) => {
  return (
    <TooltipText>
      <ReactTooltip
        place={place}
        data-for={dataFor}
        effect="solid"
        backgroundColor={'var(--white)'}
        textColor={'var(--blue-900)'}
        arrowColor={'var(--white)'}
        clickable={clickable}
        className={maxWidth('max-w-xs')}
      />
    </TooltipText>
  )
}

export default ToolTip
