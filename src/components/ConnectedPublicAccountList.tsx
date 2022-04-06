import { useSnapshot } from 'valtio'
import ConnectedPublicAccount from 'components/ConnectedPublicAccount'
import CopyPrivateKey from 'components/CopyPrivateKey'
import PublicAccountStore from 'stores/PublicAccountStore'

export default function ConnectedPublicAccountList() {
  const { accounts, account: current } = useSnapshot(PublicAccountStore)

  return (
    <>
      <CopyPrivateKey />
      {accounts.map((account) => (
        <ConnectedPublicAccount
          account={account}
          isActive={account === current}
        />
      ))}
    </>
  )
}
