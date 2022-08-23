import { BadgesNetwork } from 'stores/ContractsStore'
import { useSnapshot } from 'valtio'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'
import dataShapeObject from 'helpers/contracts/dataShapeObject'
import useOwnedAddresses from 'hooks/useOwnedAddresses'

export default function () {
  const { ledgers } = useSnapshot(SealCredStore)
  const ledgerToProofs = useSnapshot(ProofStore)
  const ownedAddresses = useOwnedAddresses(BadgesNetwork)

  const ledgerToUnmintedProofs = dataShapeObject((ledgerName) =>
    ledgerToProofs[ledgerName].proofsCompleted.filter(({ origin }) => {
      const derivative = ledgers[ledgerName][origin]
      return !derivative || !ownedAddresses.includes(derivative)
    })
  )

  return {
    ledgerToUnmintedProofs,
    hasUnmintedProofs: Object.values(ledgerToUnmintedProofs).some(
      (proofs) => proofs.length > 0
    ),
  }
}
