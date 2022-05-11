import { useSnapshot } from 'valtio'
import proofStore from 'stores/ProofStore'
import useContractAddressesOwned from 'helpers/useContractAddressesOwned'

export default function () {
  const contractAddressesOwned = useContractAddressesOwned('original')
  const { proofsCompleted } = useSnapshot(proofStore)

  const completedProofAddressesMap = proofsCompleted.reduce(
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
