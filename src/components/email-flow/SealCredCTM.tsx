import { AccentText } from 'components/Text'
import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import Card from 'components/Card'

export default function () {
  const navigate = useNavigate()

  return (
    <Card color="tertiary" paddingType="normal" shadow onlyWrap>
      <AccentText color="text-tertiary">
        Create more zkBadges with SealCred.
      </AccentText>
      <Button type="primary" small onClick={() => navigate('/app')}>
        Go to SealCred
      </Button>
    </Card>
  )
}
