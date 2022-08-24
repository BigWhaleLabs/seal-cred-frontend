import { BodyText, HintText } from 'components/ui/Text'
import { DataKeys } from 'models/DataKeys'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import BaseProof from 'helpers/proofs/BaseProof'
import HintCard from 'components/badges/HintCard'
import Network from 'models/Network'
import ProofSection from 'components/proofs/ProofSection'
import ProofStore, { generateERC721 } from 'stores/ProofStore'
import ProofsList from 'components/proofs/ProofsList'
import data from 'data'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

export function ERC721ProofSection({
  dataKey,
  network,
}: {
  dataKey: DataKeys
  network: Network
}) {
  const { proofsCompleted } = useSnapshot(ProofStore[dataKey])
  const networkProofAddressesAvailableToCreate =
    useProofAddressesAvailableToCreate(network)

  async function onCreate(original: string) {
    await generateERC721(ProofStore[dataKey], original)
  }

  return (
    <ProofsList
      proofs={proofsCompleted as BaseProof[]}
      originals={networkProofAddressesAvailableToCreate}
      onCreate={onCreate}
      dataKey={dataKey}
      nothingToGenerateText="No NFTs to proof"
    />
  )
}

export default function ERC721ProofSectionSuspended({
  dataKey,
}: {
  dataKey: DataKeys
}) {
  const network = data[dataKey].network
  return (
    <ProofSection title={<BodyText>{network} NFTs</BodyText>}>
      <Suspense
        fallback={
          <HintCard small marginY={false}>
            <HintText bold center>
              Loading...
            </HintText>
          </HintCard>
        }
      >
        <ERC721ProofSection dataKey={dataKey} network={network} />
      </Suspense>
    </ProofSection>
  )
}
