import { BodyText, HintText } from 'components/Text'
import { DataKeys } from 'models/DataKeys'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import AvailableProofsList from 'components/proofs/AvailableProofsList'
import HintCard from 'components/badges/HintCard'
import Network from 'models/Network'
import ProofSection from 'components/ProofSection'
import ProofStore from 'stores/ProofStore'
import ReadyERC721ProofsList from 'components/proofs/ReadyERC721ProofsList'
import data from 'data'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

export function ERC721ProofSection({
  account,
  dataKey,
  network,
}: {
  account: string
  dataKey: DataKeys
  network: Network
}) {
  const { proofsCompleted } = useSnapshot(ProofStore[dataKey])
  const networkProofAddressesAvailableToCreate =
    useProofAddressesAvailableToCreate(network)

  const nothingToGenerate =
    proofsCompleted.length === 0 &&
    networkProofAddressesAvailableToCreate.length === 0

  return (
    <ProofSection title={<BodyText>{network} NFTs</BodyText>}>
      <ReadyERC721ProofsList dataKey={dataKey} />
      {account && (
        <AvailableProofsList
          dataKey={dataKey}
          proofs={networkProofAddressesAvailableToCreate}
        />
      )}
      {nothingToGenerate && (
        <HintCard small marginY={false}>
          <HintText bold center>
            No NFTs to proof
          </HintText>
        </HintCard>
      )}
    </ProofSection>
  )
}

export default function ERC721ProofSectionSuspended({
  account,
  dataKey,
}: {
  account: string
  dataKey: DataKeys
}) {
  const network = data[dataKey].network
  return (
    <Suspense
      fallback={
        <ProofSection title={<BodyText>{network} NFTs</BodyText>}>
          <HintCard small marginY={false}>
            <HintText bold center>
              Loading...
            </HintText>
          </HintCard>
        </ProofSection>
      }
    >
      <ERC721ProofSection
        dataKey={dataKey}
        account={account}
        network={network}
      />
    </Suspense>
  )
}
