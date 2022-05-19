import { HighlightedText } from 'components/Text'
import ReactTooltip, { Place } from 'react-tooltip'
import classnames, {
  backgroundColor,
  borderRadius,
  inset,
  maxWidth,
  opacity,
  textColor,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const tooltipClasses = (mobile: boolean) =>
  classnames(
    backgroundColor('bg-formal-accent'),
    maxWidth('max-w-sm'),
    mobile ? inset('!left-0', '!right-0') : undefined,
    opacity('!opacity-100'),
    borderRadius('!rounded-lg')
  )

interface ToolTipProps {
  place: Place
  dataFor: string
  clickable?: boolean
}

export default function ({ place, dataFor, clickable }: ToolTipProps) {
  const { xs } = useBreakpoints()

  return (
    <HighlightedText bold>
      <ReactTooltip
        place={place}
        data-for={dataFor}
        effect="solid"
        backgroundColor={backgroundColor('bg-formal-accent')}
        textColor={textColor('text-primary-dark')}
        arrowColor={backgroundColor('bg-formal-accent')}
        clickable={clickable}
        className={tooltipClasses(xs)}
      />
    </HighlightedText>
  )
}
