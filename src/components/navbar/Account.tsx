import { AccentText } from 'components/ui/Text'
import ENSAddress from 'components/ui/ENSAddress'
import Network from 'models/Network'

export default function ({
  account,
  needNetworkChange,
}: {
  account?: string
  needNetworkChange: boolean
}) {
  const NotConnected = () =>
    needNetworkChange ? <span>Change network</span> : <span>No wallet</span>

  return (
    <AccentText
      extraSmall
      color={account ? 'text-accent' : 'text-primary-semi-dimmed'}
    >
      {account ? (
        <ENSAddress address={account} network={Network.Goerli} />
      ) : (
        <NotConnected />
      )}
    </AccentText>
  )
}
