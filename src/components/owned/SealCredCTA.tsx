import { AccentText } from 'components/ui/Text'
import { useNavigate } from 'react-router-dom'
import Button from 'components/ui/Button'
import Card from 'components/ui/Card'

export default function () {
  const navigate = useNavigate()
  return (
    <Card color="tertiary" paddingType="normal" shadow onlyWrap>
      <AccentText color="text-tertiary">
        Create your own zkNFT with SealCred.
      </AccentText>
      <Button type="primary" small onClick={() => navigate('/')}>
        Get started
      </Button>
    </Card>
  )
}
