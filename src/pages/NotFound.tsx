import { HeaderText, SubheaderText } from 'components/Text'
import {
  alignItems,
  classnames,
  display,
  flexDirection,
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
  margin('my-4'),
  alignItems('items-center')
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

export default function () {
  const navigate = useNavigate()
  return (
    <div className={container}>
      <Card shadow onlyWrap color="accent">
        <div className={textAlign('text-center')}>
          <HeaderText>404</HeaderText>
          <SubheaderText>Not found</SubheaderText>
        </div>
        <div className={wrapperBody}>
          <Button primary small onClick={() => navigate('/')}>
            Go to the main page
          </Button>
        </div>
      </Card>
    </div>
  )
}
