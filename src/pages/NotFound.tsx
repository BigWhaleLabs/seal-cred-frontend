import { HeaderText, SubheaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
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
          <SubheaderText>Not found</SubheaderText>
          <Button color="accent" onClick={() => navigate('/')}>
            Go to the main page
          </Button>
        </div>
      </Card>
    </div>
  )
}
