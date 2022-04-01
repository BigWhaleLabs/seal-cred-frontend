import { BodyText } from 'components/Text'
import {
  alignItems,
  classnames,
  display,
  flexDirection,
  space,
  textColor,
} from 'classnames/tailwind'
import Loading from 'components/Loading'

const container = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2'),
  alignItems('items-center'),
  textColor('text-primary')
)
export default function FetchingData({ text }: { text?: string }) {
  return (
    <div className={container}>
      <Loading />
      <BodyText>{text || 'Fetching...'}</BodyText>
    </div>
  )
}
