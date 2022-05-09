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
import Star from 'icons/Star'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'
import proofStore from 'stores/ProofStore'

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
  const { originalContracts } = useSnapshot(StreetCredStore)
  const { proofsCompleted } = useSnapshot(proofStore)
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
    ) ?? []

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
