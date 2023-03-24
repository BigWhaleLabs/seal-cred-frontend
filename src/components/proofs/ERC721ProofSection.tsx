import { BodyText, HintText } from 'components/ui/Text'
import { DataKey } from 'models/DataKey'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import HintCard from 'components/badges/HintCard'
import Proof from 'models/Proof'
import ProofSection from 'components/proofs/ProofSection'
import ProofStore from 'stores/ProofStore'
import ProofsList from 'components/proofs/ProofsList'
import badge from 'badgeConfig'
import data from 'data'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

function ERC721ProofSectionSuspended({ dataKey }: { dataKey: DataKey }) {
  const { network } = data[dataKey]
  const { proofsCompleted } = useSnapshot(ProofStore[dataKey])
  const originals = useProofAddressesAvailableToCreate(network)

  async function onCreate(original: string) {
    await data[dataKey].createProof(
      ProofStore[dataKey],
      original,
      data[dataKey]
    )
  }

  return (
    <ProofsList
      dataKey={dataKey}
      nothingToGenerateText="No NFTs to proof"
      originals={originals}
      proofs={proofsCompleted as Proof[]}
      onCreate={onCreate}
    />
  )
}

export default function ({ dataKey }: { dataKey: DataKey }) {
  const ledgerInfo = data[dataKey]
  const { proofTitle } = badge[ledgerInfo.badgeType]
  return (
    <ProofSection title={<BodyText>{proofTitle(ledgerInfo)}</BodyText>}>
      <Suspense
        fallback={
          <HintCard small marginY={false}>
            <HintText bold center>
              Loading...
            </HintText>
          </HintCard>
        }
      >
        <ERC721ProofSectionSuspended dataKey={dataKey} />
      </Suspense>
    </ProofSection>
  )
}
