import {
  classnames,
  display,
  gap,
  gridTemplateColumns,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AddIdentity from 'components/AddIdentity'
import EthStore from 'stores/EthStore'
import EthereumIdentityToVerify from 'components/EthereumIdentityToVerify'
import Identity from 'components/Identity'
import PublicAccountStore from 'stores/PublicAccountStore'
import useConnectingIdentityType from 'hooks/useConnectingIdentityType'

const container = classnames(
  display('grid'),
  gridTemplateColumns('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3'),
  gap('gap-4')
)

export default function Identities() {
  const connectingIdentityType = useConnectingIdentityType()
  const publicAccountStoreSnapshot = useSnapshot(PublicAccountStore)
  const ethStoreSnapshot = useSnapshot(EthStore)

  return (
    <div className={container}>
      <AddIdentity />
      {connectingIdentityType === 'dosu' && (
        <Identity connectingIdentityType={connectingIdentityType} />
      )}
      {ethStoreSnapshot.accounts
        .filter(
          (account) =>
            !PublicAccountStore.connectedIdentities.find(
              (identity) => identity.identifier === account
            )
        )
        .map((account) => (
          <EthereumIdentityToVerify address={account} key={account} />
        ))}
      {publicAccountStoreSnapshot.connectedIdentities.map((identity) => (
        <Identity
          key={`${identity.type}-${identity.identifier}`}
          connectedIdentity={identity}
        />
      ))}
    </div>
  )
}
