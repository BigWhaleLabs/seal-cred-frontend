import { useSnapshot } from 'valtio'
import Card from 'components/Card'
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
      bigCard
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
