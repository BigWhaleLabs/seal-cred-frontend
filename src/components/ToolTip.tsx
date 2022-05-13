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

const tooltipClasses = (xs: boolean) =>
  classnames(
    backgroundColor('bg-white'),
    maxWidth(xs ? 'max-w-xs' : 'max-w-sm'),
    inset(xs ? '!left-0' : undefined),
    opacity('!opacity-100'),
    borderRadius('!rounded-lg')
  )

const ToolTip: FC<{
  place: Place
  dataFor: string
  clickable?: boolean
}> = ({ place, dataFor, clickable }) => {
  const { xs, sm } = useBreakpoints()
  const xsOnly = xs && !sm

  return (
    <TooltipText>
      <ReactTooltip
        place={xsOnly ? 'top' : place}
        data-for={dataFor}
        effect="solid"
        backgroundColor={backgroundColor('bg-white')}
        textColor={textColor('text-blue-900')}
        arrowColor={backgroundColor('bg-white')}
        clickable={clickable}
        className={tooltipClasses(xsOnly)}
      />
    </TooltipText>
  )
}

export default ToolTip
