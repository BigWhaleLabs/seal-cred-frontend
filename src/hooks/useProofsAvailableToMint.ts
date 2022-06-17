import { useSnapshot } from 'valtio'
import OriginalContractsStore from 'stores/OriginalContractsStore'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'

export default function () {
  const { contractsOwned } = useSnapshot(OriginalContractsStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { ledger } = useSnapshot(SealCredStore)
  return proofsCompleted.filter(
    (proof) =>
      !ledger[proof.contract] ||
      !contractsOwned.includes(
        ledger[proof.contract].derivativeContract.address
      )
  )
}
