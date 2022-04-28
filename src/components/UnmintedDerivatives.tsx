import { BodyText, SubheaderText } from 'components/Text'
import { Suspense, useState } from 'react'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import ContractListContainer from 'components/ContractListContainer'
import StreetCredStore from 'stores/StreetCredStore'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'
import proofStore from 'stores/ProofStore'
import shortenedAddress from 'helpers/shortenedAddress'

const container = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2')
)

function ContractToMint({ address }: { address: string }) {
  const { contractNames } = useSnapshot(StreetCredStore)

  const [loading, setLoading] = useState(false)

  return (
    <div className={container}>
      <BodyText>
        {contractNames[address]
          ? `${contractNames[address]} (${shortenedAddress(address)})`
          : address}
      </BodyText>
      <Button
        loading={!!loading}
        onClick={() => {
          console.log('minting')
        }}
        small
        color="primary"
      >
        {loading ? 'minting...' : 'mint'}
      </Button>
    </div>
  )
}

function ContractList() {
  const { originalContracts, derivativeContracts, ledger } =
    useSnapshot(StreetCredStore)
  const { proofsCompleted } = useSnapshot(proofStore)
  const originalContractsOwned = originalContracts?.owned || []
  const derivativeContractsOwned = derivativeContracts?.owned || []
  const derivativeContractsOwnedAddresses = derivativeContractsOwned.map(
    (contract) => contract.address
  )
  const unownedOriginalContractsWithZKProofs = originalContractsOwned.filter(
    (contract) =>
      !!proofsCompleted.find((proof) => proof.contract === contract.address)
  )
  const unownedDerivativeContractsAddressesWithZKProofs =
    unownedOriginalContractsWithZKProofs
      .map((contract) => ledger[contract.address].derivativeContract.address)
      .filter((address) => !derivativeContractsOwnedAddresses.includes(address))

  return (
    <ContractListContainer>
      {unownedDerivativeContractsAddressesWithZKProofs.length ? (
        unownedDerivativeContractsAddressesWithZKProofs.map((address) => (
          <ContractToMint key={address} address={address} />
        ))
      ) : (
        <SubheaderText>
          You don't have any unowned derivative contracts that you can mint.
        </SubheaderText>
      )}
    </ContractListContainer>
  )
}

export default function UnmintedDerivatives() {
  return (
    <Suspense
      fallback={
        <BodyText>
          Fetching derivative NFTs that you haven't minted yet...
        </BodyText>
      }
    >
      <ContractList />
    </Suspense>
  )
}
