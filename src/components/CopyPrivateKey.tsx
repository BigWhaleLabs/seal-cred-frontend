import ConnectedPublicAccount from 'components/ConnectedPublicAccount'
import CopyWallet from 'components/CopyWallet'
import PublicAccountStore from 'stores/PublicAccountStore'
import copy from 'copy-to-clipboard'

export default function CopyPrivateKey() {
  return (
    <ConnectedPublicAccount
      account={PublicAccountStore.defaultAccount.address}
      isActive={
        PublicAccountStore.defaultAccount.address === PublicAccountStore.account
      }
    >
      <span
        className="cursor-pointer"
        onClick={() => copy(PublicAccountStore.defaultAccount.privateKey)}
      >
        <CopyWallet />
      </span>
    </ConnectedPublicAccount>
  )
}
