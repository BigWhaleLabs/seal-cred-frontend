import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { useState } from 'react'
import Button from 'components/Button'
import ChildrenProp from 'models/ChildrenProp'
import WalletStore from 'stores/WalletStore'

export default function ({
  mobile,
  children = 'Get started',
}: ChildrenProp & { mobile?: boolean }) {
  const { account } = useSnapshot(WalletStore)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  return (
    <Button
      primary
      small={mobile}
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
