import { useSnapshot } from 'valtio'
import Card from 'components/ui/Card'
import ConnectAccount from 'components/proofs/ConnectAccount'
import List from 'components/proofs/List'
import LoadingCard from 'components/proofs/LoadingCard'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { account, walletLoading } = useSnapshot(WalletStore)

  return (
    <Card
      paddingType="normal"
      color="accent"
      shadow
      useAppStyles
      nospace
      onlyWrap
    >
      {walletLoading ? (
        <LoadingCard />
      ) : account ? (
        <List />
      ) : (
        <ConnectAccount />
      )}
    </Card>
  )
}
