import { AccentText } from 'components/ui/Text'
import { useNavigate } from 'react-router-dom'
import Button from 'components/ui/Button'
import Card from 'components/ui/Card'
import classnames, {
  display,
  flexDirection,
  gap,
  padding,
} from 'classnames/tailwind'

const innerWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-6'),
  padding('xs:py-3', 'xs:px-1')
)

export default function () {
  const navigate = useNavigate()
  return (
    <Card color="tertiary" paddingType="normal" shadow onlyWrap>
      <div className={innerWrapper}>
        <AccentText color="text-tertiary">
          Create your own zkNFT with SealCred.
        </AccentText>
        <Button type="primary" small onClick={() => navigate('/')}>
          Get started
        </Button>
      </div>
    </Card>
  )
}
