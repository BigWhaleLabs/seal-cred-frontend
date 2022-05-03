import { HeaderText, SubheaderText } from 'components/Text'
import {
  alignItems,
  classnames,
  display,
  flexDirection,
  height,
  justifyContent,
  margin,
  space,
  textAlign,
} from 'classnames/tailwind'
import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import Card from 'components/Card'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  height('h-full'),
  margin('my-4')
)
const wrapperBody = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  space('space-y-4'),
  textAlign('text-center'),
  margin('mt-10')
)

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className={container}>
      <Card shadow>
        <HeaderText>404</HeaderText>
        <div className={wrapperBody}>
          <SubheaderText>Not found</SubheaderText>
          <Button design="primary" onClick={() => navigate('/')}>
            Go to the main page
          </Button>
        </div>
      </Card>
    </div>
  )
}
