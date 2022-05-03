import { FC } from 'react'
import { TooltipText } from 'components/Text'
import ReactTooltip, { Place } from 'react-tooltip'

const ToolTip: FC<{
  place: Place
  dataFor: string
  clickable?: boolean
}> = ({ place, dataFor, clickable }) => {
  return (
    <TooltipText>
      <ReactTooltip
        multiline
        place={place}
        data-for={dataFor}
        effect="solid"
        backgroundColor={'var(--white)'}
        textColor={'var(--blue-900)'}
        arrowColor={'var(--white)'}
        clickable={clickable}
      />
    </TooltipText>
  )
}

export default ToolTip
