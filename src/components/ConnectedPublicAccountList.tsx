import { useSnapshot } from 'valtio'
import ConnectedPublicAccount from 'components/ConnectedPublicAccount'
import PublicAccountStore from 'stores/PublicAccountStore'

export default function ConnectedPublicAccountList() {
  const { accounts, account: current } = useSnapshot(PublicAccountStore)

  return (
    <>
      {accounts.map((account) => (
        <ConnectedPublicAccount
          account={account}
          isActive={account === current}
        />
      ))}
    </>
  )
}
