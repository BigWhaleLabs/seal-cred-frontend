import { AccentText } from 'components/ui/Text'
import { useNavigate } from 'react-router-dom'
import Button from 'components/ui/Button'
import Card from 'components/ui/Card'

export default function () {
  const navigate = useNavigate()

  return (
    <Card onlyWrap shadow color="tertiary" paddingType="normal">
      <AccentText color="text-tertiary">
        Create more zkBadges with SealCred.
      </AccentText>
      <Button small type="primary" onClick={() => navigate('/app')}>
        Go to SealCred
      </Button>
    </Card>
  )
}
