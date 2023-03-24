import { useSnapshot } from 'valtio'
import Card from 'components/ui/Card'
import CardContainer from 'components/proofs/CardContainer'
import ConnectAccount from 'components/proofs/ConnectAccount'
import List from 'components/proofs/List'
import LoadingCard from 'components/proofs/LoadingCard'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { account, walletLoading } = useSnapshot(WalletStore)

  return (
    <CardContainer>
      <Card
        higherZIndex
        nospace
        shadow
        useAppStyles
        color="accent"
        paddingType="normal"
      >
        {walletLoading ? (
          <LoadingCard />
        ) : account ? (
          <List />
        ) : (
          <ConnectAccount />
        )}
      </Card>
    </CardContainer>
  )
}
