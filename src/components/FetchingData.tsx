import { BodyText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import Loading from 'components/Loading'

const container = classnames('flex', 'flex-row', 'space-x-2', 'items-center')
export default function FetchingData({ error }: { error?: boolean }) {
  const navigate = useNavigate()
  return (
    <div className={container}>
      {!error && <Loading />}
      <BodyText>
        {!error
          ? 'Fetching...'
          : 'Your access token is invalid. Please, make sure it is correct'}
      </BodyText>
      {error && (
        <Button color="error" onClick={() => navigate('/')}>
          Ok
        </Button>
      )}
    </div>
  )
}
