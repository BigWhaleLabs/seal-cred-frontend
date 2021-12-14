import { classnames } from 'classnames/tailwind'
import { useMetaMask } from 'metamask-react'
import { useSnapshot } from 'valtio'
import AddIdentity from 'components/AddIdentity'
import Identity from 'components/Identity'
import PublicAccountStore from 'stores/PublicAccountStore'
import useConnectingIdentityType from 'hooks/useConnectingIdentityType'

const container = classnames(
  'grid',
  'grid-cols-1',
  'sm:grid-cols-2',
  'lg:grid-cols-3',
  'gap-4'
)

export default function Identities() {
  const connectingIdentityType = useConnectingIdentityType()
  const publicAccountStoreSnapshot = useSnapshot(PublicAccountStore)
  const { status, account } = useMetaMask()

  return (
    <div className={container}>
      <AddIdentity />
      {connectingIdentityType && (
        <Identity connectingIdentityType={connectingIdentityType} />
      )}
      {publicAccountStoreSnapshot.connectedIdentities.map((identity) => (
        <Identity
          key={`${identity.type}-${identity.identifier}`}
          connectedIdentity={identity}
        />
      ))}
      <div style={{ background: 'var(--semi-background)' }}>
        {status === 'connected' ? (
          <h1 style={{ color: '#fff' }}>Connected: {account}</h1>
        ) : (
          <h1 style={{ color: '#fff' }}>Not connected</h1>
        )}
      </div>
    </div>
  )
}
