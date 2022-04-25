import { HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import Wallet from 'components/Wallet'
import WalletStore from 'stores/WalletStore'

export default function Main() {
  const { account } = useSnapshot(WalletStore)
  return (
    <Card>
      <HeaderText>That's you:</HeaderText>
      <Wallet />
      {account && (
        <>
          <HeaderText>Supported NFTs that you own:</HeaderText>
          <HeaderText>ZK proofs that you can generate:</HeaderText>
          <HeaderText>ZK proofs that you generated:</HeaderText>
          <HeaderText>Derivative NFTs that you can mint:</HeaderText>
          <HeaderText>Derivative NFTs that you own:</HeaderText>
        </>
      )}
    </Card>
  )
}
