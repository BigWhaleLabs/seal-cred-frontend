import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import ContractsStore from 'stores/ContractsStore'
import LoadingTitle from 'components/badges/LoadingTitle'
import SealCredStore from 'stores/SealCredStore'
import Title from 'components/Title'
import useProofsAvailableToMint from 'hooks/useProofsAvailableToMint'

function ListTitleSuspended() {
  const { erc721DerivativeContracts } = useSnapshot(SealCredStore)
  const proofsAvailableToMint = useProofsAvailableToMint()
  const { contractsOwned } = useSnapshot(ContractsStore)

  const ownederc721DerivativeContracts = erc721DerivativeContracts.filter(
    (contractAddress) => contractsOwned.includes(contractAddress)
  )

  const hasUnminted = proofsAvailableToMint.length > 0

  return !Object.keys(erc721DerivativeContracts).length ? (
    <LoadingTitle />
  ) : (
    <Title
      title="Create ZK badges"
      subtitle={
        hasUnminted
          ? 'Looks like you can create ZK badges for this wallet'
          : ownederc721DerivativeContracts.length
          ? 'You’ve minted all of your available badges'
          : 'Once you’ve created a ZK proof, you will be able to mint ZK badges for your anonymous wallets'
      }
    />
  )
}

export default function () {
  return (
    <Suspense fallback={<LoadingTitle />}>
      <ListTitleSuspended />
    </Suspense>
  )
}
