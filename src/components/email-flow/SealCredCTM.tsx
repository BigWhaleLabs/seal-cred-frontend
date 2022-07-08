import { AccentText } from 'components/Text'
import { margin } from 'classnames/tailwind'
import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import Card from 'components/Card'

export default function () {
  const navigate = useNavigate()

  return (
    <div className={margin('md:!mb-10')}>
      <Card color="tertiary" shadow onlyWrap>
        <AccentText color="text-tertiary">
          Create more zkBadges with SealCred.
        </AccentText>
        <Button type="primary" small onClick={() => navigate('/app')}>
          Go to SealCred
        </Button>
      </Card>
    </div>
  )
}
