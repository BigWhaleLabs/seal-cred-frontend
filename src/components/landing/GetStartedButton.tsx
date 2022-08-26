import { displayFromSm, displayFromXsToSm } from 'helpers/visibilityClassnames'
import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import ChildrenProp from 'models/ChildrenProp'

export default function ({ children = 'Get started' }: ChildrenProp) {
  const navigate = useNavigate()

  return (
    <>
      <span className={displayFromXsToSm}>
        <Button type="primary" small onClick={() => navigate('/app')}>
          {children}
        </Button>
      </span>
      <span className={displayFromSm}>
        <Button type="primary" onClick={() => navigate('/app')}>
          {children}
        </Button>
      </span>
    </>
  )
}
