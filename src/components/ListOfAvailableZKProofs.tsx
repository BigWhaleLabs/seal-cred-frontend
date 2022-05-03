import { BodyText, SubheaderText } from 'components/Text'
import { FC } from 'react'
import { Suspense, useState } from 'react'
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
  const [postingProof, setPostingProof] = useState(false)

  const proofInProgress = ProofStore.proofsInProgress.find(
    (proof) =>
      proof.account === WalletStore.account &&
      proof.contract === contractAddress
  )

  return (
    <div className={contractContainer}>
      <ContractName address={contractAddress} />
      <Button
        loading={!!proofInProgress || postingProof}
        onClick={async () => {
          setPostingProof(true)
          await ProofStore.generate(contractAddress)
          setPostingProof(false)
        }}
        design="primary"
        small
      >
        {!proofInProgress
          ? 'generate'
          : proofInProgress?.status === 'running'
          ? 'generating...'
          : proofInProgress?.status === 'scheduled'
          ? `queued${
              proofInProgress?.position !== undefined
                ? ` (position: ${proofInProgress?.position + 1})`
                : ''
            }...`
          : null}
      </Button>
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
