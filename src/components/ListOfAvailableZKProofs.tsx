import { BodyText } from 'components/Text'
import { FC } from 'react'
import { Suspense, useState } from 'react'
import { animation } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import ContractListContainer from 'components/ContractListContainer'
import ContractName from 'components/ContractName'
import Proof from 'models/Proof'
import ProofButton from 'components/ProofButton'
import ProofLine from 'components/ProofLine'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'
import Star from 'icons/Star'
import WalletStore from 'stores/WalletStore'

function useProofContent(
  proofInProgress?: Proof,
  posting?: boolean
): ['green' | 'yellow' | 'pink', JSX.Element | null] {
  if (!proofInProgress && !posting) return ['green', <>Create proof</>]
  if (proofInProgress?.status === 'running' || posting)
    return [
      'yellow',
      <>
        <span>Generating...</span>
        <div className={animation('animate-spin')}>
          <Star />
        </div>
      </>,
    ]
  if (proofInProgress?.status === 'scheduled')
    return [
      'pink',
      <>
        {proofInProgress?.position !== undefined
          ? `Queued by position: ${proofInProgress?.position + 1}`
          : 'Queued'}
      </>,
    ]
  return ['yellow', null]
}

const ZKProof: FC<{ contractAddress: string }> = ({ contractAddress }) => {
  const [postingProof, setPostingProof] = useState(false)

  const proofInProgress = ProofStore.proofsInProgress.find(
    (proof) =>
      proof.account === WalletStore.account &&
      proof.contract === contractAddress
  )

  const [color, content] = useProofContent(proofInProgress, postingProof)

  return (
    <ProofLine>
      <ContractName address={contractAddress} />
      <ProofButton
        color={color}
        onClick={async () => {
          setPostingProof(true)
          await ProofStore.generate(contractAddress)
          setPostingProof(false)
        }}
      >
        {content}
      </ProofButton>
    </ProofLine>
  )
}

function ContractList() {
  const { originalContracts } = useSnapshot(SealCredStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { account } = useSnapshot(WalletStore)

  if (!account) {
    return null
  }

  const completedProofsSet = proofsCompleted.reduce(
    (contracts, proof) => ({
      ...contracts,
      [proof.contract]: true,
    }),
    {} as {
      [address: string]: boolean
    }
  )

  const originalOwnedContractsWithoutCompletedProofs =
    originalContracts?.owned.filter(
      (contract) => !completedProofsSet[contract.address]
    ) || []

  return (
    <>
      {!!originalOwnedContractsWithoutCompletedProofs.length && (
        <ContractListContainer>
          {originalOwnedContractsWithoutCompletedProofs.map((contract) => (
            <ZKProof contractAddress={contract.address} />
          ))}
        </ContractListContainer>
      )}
    </>
  )
}

export default function ListOfAvailableZKProofs() {
  return (
    <Suspense
      fallback={
        <BodyText size="base">
          Fetching available tokens owned by you...
        </BodyText>
      }
    >
      <ContractList />
    </Suspense>
  )
}
