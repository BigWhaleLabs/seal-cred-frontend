import { useSnapshot } from 'valtio'
import ContractsStore from 'stores/ContractsStore'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'

export default function () {
  const { ERC721ProofsCompleted } = useSnapshot(ProofStore)
  const { contractsOwned } = useSnapshot(ContractsStore)
  const { derivativeContracts = [] } = useSnapshot(SealCredStore)
  const completedERC721ProofAddressesMap = [...ERC721ProofsCompleted].reduce(
    (result, proof) => ({
      ...result,
      [proof.contract]: true,
    }),
    {} as { [address: string]: boolean }
  )
  return (
    contractsOwned.filter(
      (address) =>
        !derivativeContracts.includes(address) &&
        !completedERC721ProofAddressesMap[address]
    ) || []
  )
}
