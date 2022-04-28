import { BodyText, SubheaderText } from 'components/Text'
import { FC } from 'react'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import ContractListContainer from 'components/ContractListContainer'
import ContractName from 'components/ContractName'
import StreetCredStore from 'stores/StreetCredStore'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'
import proofStore from 'stores/ProofStore'

const contractContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2')
)

const ZKProof: FC<{ contractAddress: string }> = ({ contractAddress }) => {
  const { proofsInProgress } = useSnapshot(proofStore)
  const proof = proofsInProgress[contractAddress]

  function onGenerate() {
    void proofStore.generate(contractAddress)
  }

  return (
    <div className={contractContainer}>
      <ContractName address={contractAddress} />
      <Button loading={!!proof} onClick={onGenerate} small color="primary">
        {proof?.status ?? 'generate'}
      </Button>
    </div>
  )
}

function ContractList() {
  const { originalContracts } = useSnapshot(StreetCredStore)

  return (
    <>
      {originalContracts?.owned?.length ? (
        <ContractListContainer>
          {originalContracts.owned.map((contract) => (
            <ZKProof contractAddress={contract.address} />
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
