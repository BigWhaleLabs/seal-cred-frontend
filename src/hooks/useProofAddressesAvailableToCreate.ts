import { useSnapshot } from 'valtio'
import OriginalContractsStore from 'stores/OriginalContractsStore'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'

export default function () {
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { contractsOwned } = useSnapshot(OriginalContractsStore)
  const { reverseLedger } = useSnapshot(SealCredStore)
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
        !reverseLedger[address] && !completedProofAddressesMap[address]
    ) || []
  )
}
