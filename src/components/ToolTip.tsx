import { FC } from 'react'
import { TooltipText } from 'components/Text'
import ReactTooltip, { Place } from 'react-tooltip'
import classnames, {
  backgroundColor,
  borderRadius,
  inset,
  maxWidth,
  opacity,
  textColor,
} from 'classnames/tailwind'
import useBreakpoints from 'helpers/useBreakpoints'

const tooltipClasses = (mobile: boolean) =>
  classnames(
    backgroundColor('bg-white'),
    maxWidth('max-w-sm'),
    mobile ? inset('!left-0', '!right-0') : undefined,
    opacity('!opacity-100'),
    borderRadius('!rounded-lg')
  )

const ToolTip: FC<{
  place: Place
  dataFor: string
  clickable?: boolean
}> = ({ place, dataFor, clickable }) => {
  const { mobile } = useBreakpoints()

  return (
    <TooltipText>
      <ReactTooltip
        place={place}
        data-for={dataFor}
        effect="solid"
        backgroundColor={backgroundColor('bg-white')}
        textColor={textColor('text-accent-dark')}
        arrowColor={backgroundColor('bg-white')}
        clickable={clickable}
        className={tooltipClasses(mobile)}
      />
    </TooltipText>
  )
}

export default ToolTip
