import { useSnapshot } from 'valtio'
import ContractsStore from 'stores/ContractsStore'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'

export default function () {
  const { nftsProofsCompleted } = useSnapshot(ProofStore)
  const { contractsOwned } = useSnapshot(ContractsStore)
  const { erc721DerivativeContracts } = useSnapshot(SealCredStore)
  const completedNftsProofAddressesMap = [...nftsProofsCompleted].reduce(
    (result, proof) => ({
      ...result,
      [proof.contract]: true,
    }),
    {} as { [address: string]: boolean }
  )
  // TODO: add workProofsCompleted
  return (
    contractsOwned.filter(
      (address) =>
        !erc721DerivativeContracts.includes(address) &&
        !completedNftsProofAddressesMap[address]
    ) || []
  )
}
