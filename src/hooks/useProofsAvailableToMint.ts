import { useSnapshot } from 'valtio'
import DerivativeContractsStore from 'stores/DerivativeContractsStore'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'

export default function () {
  const { contractsToIsOwnedMap } = useSnapshot(DerivativeContractsStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { ledger } = useSnapshot(SealCredStore)
  return proofsCompleted.filter(
    (proof) =>
      !ledger[proof.contract] ||
      !contractsToIsOwnedMap[ledger[proof.contract].derivativeContract.address]
  )
}
