import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { useState } from 'react'
import Button from 'components/Button'
import WalletStore from 'stores/WalletStore'

const GetStartedButton = () => {
  const { account } = useSnapshot(WalletStore)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  return (
    <Button
      colors="primary"
      loading={loading}
      onClick={async () => {
        setLoading(true)
        if (!account) await WalletStore.connect()
        if (account) navigate('/app')
        setLoading(false)
      }}
    >
      Get started
    </Button>
  )
}

export default GetStartedButton
