import { BodyText } from 'components/Text'
import { FC } from 'react'
import { Suspense, useState } from 'react'
import { useSnapshot } from 'valtio'
import ContractListContainer from 'components/ContractListContainer'
import ContractName from 'components/ContractName'
import ProofButton from 'components/ProofButton'
import ProofLine from 'components/ProofLine'
import ProofStore from 'stores/ProofStore'
import Star from 'components/Star'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'

const ZKProof: FC<{ contractAddress: string }> = ({ contractAddress }) => {
  const [postingProof, setPostingProof] = useState(false)

  const proofInProgress = ProofStore.proofsInProgress.find(
    (proof) =>
      proof.account === WalletStore.account &&
      proof.contract === contractAddress
  )

  return (
    <ProofLine>
      <ContractName address={contractAddress} />
      <ProofButton
        color={
          !proofInProgress && !postingProof
            ? 'green'
            : proofInProgress?.status === 'running' || postingProof
            ? 'yellow'
            : proofInProgress?.status === 'scheduled'
            ? 'pink'
            : 'yellow'
        }
        onClick={async () => {
          setPostingProof(true)
          await ProofStore.generate(contractAddress)
          setPostingProof(false)
        }}
      >
        {!proofInProgress && !postingProof ? (
          'Create proof'
        ) : proofInProgress?.status === 'running' || postingProof ? (
          <>
            <span>Generating...</span>
            <Star />
          </>
        ) : proofInProgress?.status === 'scheduled' ? (
          `Queued by ${
            proofInProgress?.position !== undefined
              ? ` position: ${proofInProgress?.position + 1}`
              : ''
          }`
        ) : null}
      </ProofButton>
    </ProofLine>
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
      ) : null}
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
