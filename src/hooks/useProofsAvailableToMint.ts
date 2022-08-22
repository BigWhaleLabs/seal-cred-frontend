import { GoerliContractsStore } from 'stores/ContractsStore'
import { useSnapshot } from 'valtio'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'
import dataShapeObject from 'helpers/contracts/dataShapeObject'
import useContractsOwned from 'hooks/useContractsOwned'

export default function () {
  const contractsOwned = useContractsOwned(GoerliContractsStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { ledgers } = useSnapshot(SealCredStore)

  return dataShapeObject((ledgerKey) =>
    proofsCompleted.filter((proof) => {
      const proofLedgerName = proof.dataType
      if (proofLedgerName !== ledgerKey) return false
      const ledger = ledgers[proofLedgerName]
      const record = ledger[proof.origin]
      return (
        !record || !contractsOwned.includes(record.derivative.toLowerCase())
      )
    })
  )
}
