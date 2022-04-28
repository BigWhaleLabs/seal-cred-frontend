import { BodyText, SubheaderText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import ContractListContainer from 'components/ContractListContainer'
import ContractName from 'components/ContractName'
import StreetCredStore from 'stores/StreetCredStore'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'

/*
 TODO: Display "Supported NFTs that you own" minus the ZK proofs that are already generated (or take it from ProofStore?)
 TODO: each ZK proof that can be generated should have the button "generate", which should call ProofStore.generate method
 TODO: proofs that are being generated should be taken from ProofStore, just being displayed here, no actual business-logic should be present in the UI
 TODO: we should be able to generate multiple proofs at a time (even though they are queued)
 TODO: we should display the queue position of the jobs 
*/

const contractContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2')
)

function ContractList() {
  const { originalContracts } = useSnapshot(StreetCredStore)
  return (
    <>
      {originalContracts?.owned?.length ? (
        <ContractListContainer>
          {originalContracts.owned.map((contract) => (
            <div className={contractContainer} key={contract.address}>
              <ContractName address={contract.address} />
              <Button small color="primary">
                Generate
              </Button>
            </div>
          ))}
        </ContractListContainer>
      ) : (
        <SubheaderText>You don't have any supported tokens yet.</SubheaderText>
      )}
    </>
  )
}

export default function ListOfAvailableZKProofs() {
  return (
    <Suspense
      fallback={<BodyText>Fetching available tokens owned by you...</BodyText>}
    >
      <ContractList />
    </Suspense>
  )
}
