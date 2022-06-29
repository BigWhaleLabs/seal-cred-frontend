import { BodyText, HintText } from 'components/Text'
import { useSnapshot } from 'valtio'
import AvailableProofsList from 'components/proofs/AvailableProofsList'
import HintCard from 'components/badges/HintCard'
import ProofSection from 'components/ProofSection'
import ReadyERC721ProofsList from 'components/proofs/ERC721/ReadyERC721ProofsList'
import proofStore from 'stores/ProofStore'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'
import walletStore from 'stores/WalletStore'

export default function () {
  const { account } = useSnapshot(walletStore)
  const { ERC721ProofsCompleted } = useSnapshot(proofStore)
  const proofAddressesAvailableToCreate = useProofAddressesAvailableToCreate()

  const nothingToGenerate =
    ERC721ProofsCompleted.length === 0 &&
    proofAddressesAvailableToCreate.length === 0

  return (
    <ProofSection title={<BodyText>NFTs</BodyText>}>
      <ReadyERC721ProofsList />
      {account && <AvailableProofsList />}
      {nothingToGenerate && (
        <HintCard small>
          <HintText bold center>
            No NFTs to proof
          </HintText>
        </HintCard>
      )}
    </ProofSection>
  )
}