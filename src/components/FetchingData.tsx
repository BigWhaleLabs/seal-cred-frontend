import { BodyText } from 'components/Text'
import {
  alignItems,
  classnames,
  display,
  flexDirection,
  space,
} from 'classnames/tailwind'
import Loading from 'components/Loading'

const container = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2'),
  alignItems('items-center')
)
export default function FetchingData() {
  return (
    <div className={container}>
      <Loading />
      <BodyText>Fetching...</BodyText>
    </div>
  )
}
