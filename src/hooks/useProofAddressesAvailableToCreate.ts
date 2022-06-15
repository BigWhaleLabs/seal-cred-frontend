import { useSnapshot } from 'valtio'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'
import useContractAddressesOwned from 'hooks/useContractAddressesOwned'

export default function () {
  const contractAddressesOwned = useContractAddressesOwned('original')
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { derivativeLedger } = useSnapshot(SealCredStore)

  const completedProofAddressesMap = [...proofsCompleted].reduce(
    (result, proof) => ({
      ...result,
      [proof.contract]: true,
    }),
    {} as { [address: string]: boolean }
  )

  return (
    contractAddressesOwned.filter(
      (address) =>
        derivativeLedger &&
        !derivativeLedger[address] &&
        !completedProofAddressesMap[address]
    ) || []
  )
}
