import { FC } from 'react'
import { TooltipText } from 'components/Text'
import ReactTooltip, { Place } from 'react-tooltip'
import classnames, {
  backgroundColor,
  maxWidth,
  textColor,
} from 'classnames/tailwind'

const tooltipClasses = classnames(
  backgroundColor('bg-white'),
  textColor('text-blue-900'),
  maxWidth('max-w-sm')
)

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
        backgroundColor={backgroundColor('bg-white')}
        textColor={textColor('text-blue-900')}
        arrowColor={backgroundColor('bg-white')}
        clickable={clickable}
        className={tooltipClasses}
      />
    </TooltipText>
  )
}

export default ToolTip
