import { BodyText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import Loading from 'components/Loading'

const container = classnames('flex', 'flex-row', 'space-x-2', 'items-center')
export default function FetchingData() {
  return (
    <div className={container}>
      <Loading />
      <BodyText>Fetching...</BodyText>
    </div>
  )
}
