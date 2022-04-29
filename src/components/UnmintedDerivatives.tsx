import { BodyText, SubheaderText } from 'components/Text'
import { Suspense, useState } from 'react'
import { handleError } from 'helpers/handleError'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import ContractListContainer from 'components/ContractListContainer'
import ProofStore from 'stores/ProofStore'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'
import shortenedAddress from 'helpers/shortenedAddress'

const container = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2')
)

function ContractToMint({
  address,
  originalAddress,
}: {
  address: string
  originalAddress: string
}) {
  const { contractNames, ledger } = useSnapshot(StreetCredStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { account } = useSnapshot(WalletStore)

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
        onClick={async () => {
          setLoading(true)
          try {
            if (!account) throw new Error('No account found')
            const derivativeContractAddress =
              ledger[originalAddress].derivativeContract.address
            const proof = proofsCompleted.find(
              (proof) => proof.contract === originalAddress
            )
            if (!proof || !proof.result) throw new Error('No proof found')
            console.log('Minting derivative...')
            await WalletStore.mintDerivative(
              derivativeContractAddress,
              proof.result
            )
            console.log('Derivative minted!')
            await StreetCredStore.refreshDerivativeContracts(account)
          } catch (error) {
            handleError(error)
          } finally {
            setLoading(false)
          }
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
  const { derivativeContracts, ledger } = useSnapshot(StreetCredStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const unownedDerivativeContracts = derivativeContracts?.unowned || []
  const unownedDerivativeToOriginalAddressesMap = {} as {
    [derivativeAddress: string]: string
  }
  for (const originalAddress of Object.keys(ledger)) {
    const derivativeContract = ledger[originalAddress].derivativeContract
    if (derivativeContract) {
      unownedDerivativeToOriginalAddressesMap[derivativeContract.address] =
        originalAddress
    }
  }

  const unownedDerivativeContractsWithZKProofs =
    unownedDerivativeContracts.filter(
      (contract) =>
        !!proofsCompleted.find(
          (proof) =>
            proof.contract ===
            unownedDerivativeToOriginalAddressesMap[contract.address]
        )
    )
  const unownedLedgerRecordsWithZKProofs =
    unownedDerivativeContractsWithZKProofs.map(
      (contract) =>
        ledger[unownedDerivativeToOriginalAddressesMap[contract.address]]
    )

  return (
    <ContractListContainer>
      {unownedLedgerRecordsWithZKProofs.length ? (
        unownedLedgerRecordsWithZKProofs.map((ledgerRecord) => (
          <ContractToMint
            key={ledgerRecord.originalContract.address}
            address={ledgerRecord.derivativeContract.address}
            originalAddress={ledgerRecord.originalContract.address}
          />
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
