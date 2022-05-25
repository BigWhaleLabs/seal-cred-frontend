import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { useState } from 'react'
import Button from 'components/Button'
import ChildrenProp from 'models/ChildrenProp'
import WalletStore from 'stores/WalletStore'
import useBreakpoints from 'hooks/useBreakpoints'

export default function ({ children = 'Get started' }: ChildrenProp) {
  const { account } = useSnapshot(WalletStore)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { xs } = useBreakpoints()

  return (
    <Button
      primary
      small={xs}
      loading={loading}
      onClick={async () => {
        setLoading(true)
        if (!account) await WalletStore.connect()
        if (account) navigate('/app')
        setLoading(false)
      }}
    >
      {children}
    </Button>
  )
}
