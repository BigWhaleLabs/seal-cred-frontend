import { HeaderText, SubheaderText } from 'components/ui/Text'
import {
  alignItems,
  classnames,
  display,
  flexDirection,
  justifyContent,
  space,
  textAlign,
} from 'classnames/tailwind'
import { useNavigate } from 'react-router-dom'
import Button from 'components/ui/Button'
import Card from 'components/ui/Card'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  textAlign('text-center')
)
const bodyWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  space('space-y-4')
)

export default function () {
  const navigate = useNavigate()
  return (
    <div className={container}>
      <Card shadow onlyWrap color="accent">
        <div className={bodyWrapper}>
          <div className={space('space-y-2')}>
            <HeaderText>404</HeaderText>
            <SubheaderText>Not found</SubheaderText>
          </div>
          <Button type="primary" small onClick={() => navigate('/')}>
            Go to the main page
          </Button>
        </div>
      </Card>
    </div>
  )
}
