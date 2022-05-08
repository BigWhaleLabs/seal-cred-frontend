import { AccentText, BodyText, HeaderText } from 'components/Text'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { useState } from 'react'
import Button from 'components/Button'
import Card from 'components/Card'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
} from 'classnames/tailwind'

const pageBox = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)

function Landing() {
  const navigate = useNavigate()
  const { account } = useSnapshot(WalletStore)
  const [loading, setLoading] = useState(false)

  return (
    <div className={pageBox}>
      <Card shadow color="yellow" onlyWrap>
        <HeaderText size="4xl">
          Build your pseudonymous identity with ZK badges
        </HeaderText>
        <BodyText size="base">
          <AccentText color="text-yellow">SealCred</AccentText> allows you to
          experience the world pseudonymously with ZK badges. This means you can
          prove ownership of an NFT without it tracing back to you.
        </BodyText>
        <Button
          colors="primary"
          loading={loading}
          onClick={async () => {
            setLoading(true)
            account ? navigate('/app') : await WalletStore.connect()
            navigate('/app')
            setLoading(false)
          }}
        >
          Get started
        </Button>
      </Card>
    </div>
  )
}

export default Landing
