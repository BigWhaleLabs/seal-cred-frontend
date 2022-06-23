import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import AvailableProofsList from 'components/proofs/AvailableProofsList'
import HintCard from 'components/badges/HintCard'
import ProofSection from 'components/ProofSection'
import ReadyProofsList from 'components/proofs/ReadyProofsList'
import proofStore from 'stores/ProofStore'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'
import walletStore from 'stores/WalletStore'

export default function () {
  const { account } = useSnapshot(walletStore)
  const { nftsProofsCompleted } = useSnapshot(proofStore)
  const proofAddressesAvailableToCreate = useProofAddressesAvailableToCreate()

  const nothingToGenerate =
    nftsProofsCompleted.length === 0 &&
    proofAddressesAvailableToCreate.length === 0

  return (
    <ProofSection title={<BodyText>NFTs</BodyText>}>
      <ReadyProofsList />
      {account && <AvailableProofsList />}
      {nothingToGenerate && <HintCard text="No NFts to proof" />}
    </ProofSection>
  )
}
