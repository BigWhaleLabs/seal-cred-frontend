import { useNavigate } from 'react-router-dom'
import Button from 'components/ui/Button'
import ChildrenProp from 'models/ChildrenProp'
import useBreakpoints from 'hooks/useBreakpoints'

export default function ({ children = 'Get started' }: ChildrenProp) {
  const navigate = useNavigate()
  const { sm } = useBreakpoints()

  return (
    <Button small={!sm} type="primary" onClick={() => navigate('/app')}>
      {children}
    </Button>
  )
}
