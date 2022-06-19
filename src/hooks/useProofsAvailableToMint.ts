import { useSnapshot } from 'valtio'
import ContractsStore from 'stores/ContractsStore'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'

export default function () {
  const { contractsOwned } = useSnapshot(ContractsStore)
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
