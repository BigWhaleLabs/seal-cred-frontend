import { useSnapshot } from 'valtio'
import ProofStore from 'stores/ProofStore'
import useContractAddressesOwned from 'helpers/useContractAddressesOwned'

export default function () {
  const contractAddressesOwned = useContractAddressesOwned('original')
  const { proofsCompleted, proofsInProgress } = useSnapshot(ProofStore)

  const completedProofAddressesMap = [
    ...proofsInProgress,
    ...proofsCompleted,
  ].reduce(
    (result, proof) => ({
      ...result,
      [proof.contract]: true,
    }),
    {} as { [address: string]: boolean }
  )

  return (
    contractAddressesOwned.filter(
      (address) => !completedProofAddressesMap[address]
    ) || []
  )
}
