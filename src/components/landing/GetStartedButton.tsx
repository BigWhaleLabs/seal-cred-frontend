import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import ChildrenProp from 'models/ChildrenProp'
import useBreakpoints from 'hooks/useBreakpoints'

export default function ({ children = 'Get started' }: ChildrenProp) {
  const navigate = useNavigate()
  const { xs } = useBreakpoints()

  return (
    <Button type="primary" small={xs} onClick={() => navigate('/app')}>
      {children}
    </Button>
  )
}
