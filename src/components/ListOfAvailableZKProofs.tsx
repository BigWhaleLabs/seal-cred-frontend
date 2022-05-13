import { BodyText } from 'components/Text'
import { FC } from 'react'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import ContractListContainer from 'components/ContractListContainer'
import ContractName from 'components/ContractName'
import ProofButton from 'components/ProofButton'
import ProofLine from 'components/ProofLine'
import ProofStore from 'stores/ProofStore'
import WalletStore from 'stores/WalletStore'
import useBreakpoints from 'helpers/useBreakpoints'
import useProofAddressesAvailableToCreate from 'helpers/useProofAddressesAvailableToCreate'

const ZKProof: FC<{ contractAddress: string }> = ({ contractAddress }) => {
  const { xs } = useBreakpoints()

  return (
    <ProofLine>
      <ContractName address={contractAddress} truncate={xs} overflow />
      <ProofButton
        color="green"
        onClick={() => {
          void ProofStore.generate(contractAddress)
        }}
      >
        Create proof
      </ProofButton>
    </ProofLine>
  )
}

function ContractList() {
  const proofAddressesAvailableToCreate = useProofAddressesAvailableToCreate()
  const { account } = useSnapshot(WalletStore)

  if (!account) {
    return null
  }

  return (
    <>
      {!!proofAddressesAvailableToCreate.length && (
        <ContractListContainer>
          {proofAddressesAvailableToCreate.map((address) => (
            <ZKProof contractAddress={address} key={address} />
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
          Fetching the supported tokens owned by you...
        </BodyText>
      }
    >
      <ContractList />
    </Suspense>
  )
}
