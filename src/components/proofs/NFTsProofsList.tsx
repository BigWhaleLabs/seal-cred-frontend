import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import AvailableProofsList from 'components/proofs/AvailableProofsList'
import ProofSection from 'components/ProofSection'
import ReadyProofsList from 'components/proofs/ReadyProofsList'
import walletStore from 'stores/WalletStore'

export default function () {
  const { account } = useSnapshot(walletStore)
  return (
    <ProofSection title={<BodyText>NFTs</BodyText>}>
      <ReadyProofsList />
      {account && <AvailableProofsList />}
    </ProofSection>
  )
}
