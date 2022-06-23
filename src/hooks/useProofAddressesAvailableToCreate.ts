import { useSnapshot } from 'valtio'
import ContractsStore from 'stores/ContractsStore'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'

export default function () {
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { contractsOwned } = useSnapshot(ContractsStore)
  const { erc721DerivativeContracts } = useSnapshot(SealCredStore)
  const completedProofAddressesMap = [...proofsCompleted].reduce(
    (result, proof) => ({
      ...result,
      [proof.contract]: true,
    }),
    {} as { [address: string]: boolean }
  )
  return (
    contractsOwned.filter(
      (address) =>
        !erc721DerivativeContracts.includes(address) &&
        !completedProofAddressesMap[address]
    ) || []
  )
}
