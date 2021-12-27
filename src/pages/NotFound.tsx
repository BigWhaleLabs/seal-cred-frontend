import { classnames } from 'classnames/tailwind'
import { HeaderText, SubheaderText } from 'components/Text'
import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import Card from 'components/Card'

const container = classnames('flex', 'flex-col', 'h-full', 'my-4')
const wrapperBody = classnames(
  'flex',
  'flex-col',
  'items-center',
  'justify-center',
  'space-y-4',
  'text-center',
  'mt-10'
)

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className={container}>
      <Card shadow>
        <HeaderText>404</HeaderText>
        <div className={wrapperBody}>
          <SubheaderText>
            The entered address is invalid or not found. Please, make sure it is
            the correct eth address.
          </SubheaderText>
          <Button color="accent" onClick={() => navigate('/')}>
            Back to main
          </Button>
        </div>
      </Card>
    </div>
  )
}
