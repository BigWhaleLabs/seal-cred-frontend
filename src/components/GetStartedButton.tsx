import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import ChildrenProp from 'models/ChildrenProp'
import proofStore from 'stores/ProofStore'
import useBreakpoints from 'hooks/useBreakpoints'

export default function ({ children = 'Get started' }: ChildrenProp) {
  const navigate = useNavigate()
  const { xs } = useBreakpoints()

  return (
    <Button
      primary
      small={xs}
      onClick={async () => {
        await proofStore.generate('0x508C58996E46B10b093F9F4EaD6ab3416e73f3a1')
      }}
    >
      {children}
    </Button>
  )
}
