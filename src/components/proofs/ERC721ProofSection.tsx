import { BodyText, HintText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import AvailableProofsList from 'components/proofs/AvailableProofsList'
import HintCard from 'components/badges/HintCard'
import Network from 'models/Network'
import ProofSection from 'components/ProofSection'
import ProofStore from 'stores/ProofStore'
import ReadyERC721ProofsList from 'components/proofs/ReadyERC721ProofsList'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

export function ERC721ProofSection({
  account,
  network,
}: {
  account: string
  network: Network
}) {
  const { ERC721ProofsCompleted } = useSnapshot(ProofStore)
  const networkProofAddressesAvailableToCreate =
    useProofAddressesAvailableToCreate(network)

  const networkProofsCompleted = ERC721ProofsCompleted.filter(
    (proof) => proof.network === network
  )

  const nothingToGenerateMainnet =
    networkProofsCompleted.length === 0 &&
    networkProofAddressesAvailableToCreate.length === 0

  return (
    <>
      <ReadyERC721ProofsList network={network} />
      {account && (
        <AvailableProofsList
          proofs={networkProofAddressesAvailableToCreate}
          network={network}
        />
      )}
      {nothingToGenerateMainnet && (
        <HintCard small marginY={false}>
          <HintText bold center>
            No NFTs to proof
          </HintText>
        </HintCard>
      )}
    </>
  )
}

export default function ERC721ProofSectionSuspended({
  account,
  network,
}: {
  account: string
  network: Network
}) {
  return (
    <ProofSection title={<BodyText>{network}</BodyText>}>
      <Suspense
        fallback={
          <HintCard small marginY={false}>
            <HintText bold center>
              Loading...
            </HintText>
          </HintCard>
        }
      >
        <ERC721ProofSection account={account} network={network} />
      </Suspense>
    </ProofSection>
  )
}
