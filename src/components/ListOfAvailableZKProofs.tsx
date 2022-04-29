import { BodyText, SubheaderText } from 'components/Text'
import { FC } from 'react'
import { Suspense, useState } from 'react'
import { handleError } from 'helpers/handleError'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import ContractListContainer from 'components/ContractListContainer'
import ContractName from 'components/ContractName'
import ProofStore from 'stores/ProofStore'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'

const contractContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2')
)

const ZKProof: FC<{ contractAddress: string }> = ({ contractAddress }) => {
  const [generating, setGenerating] = useState(false)

  const proofInProgress = ProofStore.proofsInProgress.find(
    (proof) =>
      proof.account === WalletStore.account &&
      proof.contract === contractAddress
  )
  const position = proofInProgress?.position

  return (
    <div className={contractContainer}>
      <ContractName address={contractAddress} />
      <Button
        loading={!!proofInProgress}
        disabled={generating}
        onClick={async () => {
          setGenerating(true)

          try {
            await ProofStore.generate(contractAddress)
          } catch (error) {
            handleError(error)
          } finally {
            setGenerating(false)
          }
        }}
        small
        color="primary"
      >
        {proofInProgress ? 'generating...' : 'generate'}
      </Button>
      {proofInProgress?.status === 'scheduled' && position && position >= 0 && (
        <SubheaderText>Your position in queue is: {position + 1}</SubheaderText>
      )}
    </div>
  )
}

function ContractList() {
  const { originalContracts } = useSnapshot(StreetCredStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { account } = useSnapshot(WalletStore)

  if (!account) {
    return null
  }

  const completedProofsMap = proofsCompleted.reduce((p, c) => {
    if (p[c.contract]) {
      p[c.contract][c.account] = true
    } else {
      p[c.contract] = { [c.account]: true }
    }
    return p
  }, {} as { [contractAddress: string]: { [account: string]: boolean } })

  const originalOwnedContractsWithoutCompletedProofs =
    originalContracts?.owned.filter(
      (contract) => !completedProofsMap[contract.address]?.[account]
    ) || []

  return (
    <>
      {originalOwnedContractsWithoutCompletedProofs.length ? (
        <ContractListContainer>
          {originalOwnedContractsWithoutCompletedProofs.map((contract) => (
            <ZKProof contractAddress={contract.address} />
          ))}
        </ContractListContainer>
      ) : (
        <SubheaderText>
          You don't have any supported tokens available for zero knowledge proof
          generation.
        </SubheaderText>
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
