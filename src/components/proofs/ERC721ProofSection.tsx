import { BodyText, HintText } from 'components/ui/Text'
import { DataKeys } from 'models/DataKeys'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import HintCard from 'components/badges/HintCard'
import Proof from 'models/Proof'
import ProofSection from 'components/proofs/ProofSection'
import ProofStore from 'stores/ProofStore'
import ProofsList from 'components/proofs/ProofsList'
import data from 'data'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

export function ERC721ProofSection({ dataKey }: { dataKey: DataKeys }) {
  const network = data[dataKey].network
  const { proofsCompleted } = useSnapshot(ProofStore[dataKey])
  const networkProofAddressesAvailableToCreate =
    useProofAddressesAvailableToCreate(network)

  async function onCreate(original: string) {
    await data[dataKey].createProof(ProofStore[dataKey], original)
  }

  return (
    <ProofsList
      proofs={proofsCompleted as Proof[]}
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
  return (
    <ProofSection title={<BodyText>{data[dataKey].proofTitle}</BodyText>}>
      <Suspense
        fallback={
          <HintCard small marginY={false}>
            <HintText bold center>
              Loading...
            </HintText>
          </HintCard>
        }
      >
        <ERC721ProofSection dataKey={dataKey} />
      </Suspense>
    </ProofSection>
  )
}
