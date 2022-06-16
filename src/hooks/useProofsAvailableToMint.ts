import { useSnapshot } from 'valtio'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'

export default function () {
  const { derivativeContractsToIsOwnedMap } = useSnapshot(SealCredStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { ledger } = useSnapshot(SealCredStore)
  return proofsCompleted.filter(
    (proof) =>
      !ledger[proof.contract] ||
      !derivativeContractsToIsOwnedMap[
        ledger[proof.contract].derivativeContract.address
      ]
  )
}
