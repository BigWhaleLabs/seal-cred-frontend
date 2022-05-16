import { handleError } from 'helpers/handleError'
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
        try {
          if (!account) await WalletStore.connect()
          navigate('/app')
        } catch (e) {
          handleError(e)
        } finally {
          setLoading(false)
        }
      }}
    >
      Get started
    </Button>
  )
}

export default GetStartedButton
