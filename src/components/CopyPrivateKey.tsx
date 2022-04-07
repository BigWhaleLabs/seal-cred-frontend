import CopyWallet from 'components/CopyWallet'
import PublicAccountStore from 'stores/PublicAccountStore'
import copy from 'copy-to-clipboard'

export default function CopyPrivateKey() {
  if (!PublicAccountStore.privateKey) {
    return null
  }

  return (
    <span
      className="cursor-pointer"
      onClick={() => copy(PublicAccountStore.privateKey ?? '')}
    >
      <CopyWallet />
    </span>
  )
}
