import { FC } from 'react'
import { TooltipText } from 'components/Text'
import ReactTooltip, { Place } from 'react-tooltip'
import classnames, {
  backgroundColor,
  maxWidth,
  textColor,
} from 'classnames/tailwind'

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
        className={classnames(
          backgroundColor('bg-white'),
          textColor('text-blue-900'),
          maxWidth('max-w-sm')
        )}
      />
    </TooltipText>
  )
}

export default ToolTip
