import { BadgesContractsStore } from 'stores/ContractsStore'
import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import dataShapeObject from 'helpers/contracts/dataShapeObject'
import useContractsOwned from 'hooks/useContractsOwned'

export default function () {
  const contractsOwned = useContractsOwned(BadgesContractsStore)
  const { ledgerToDerivativeContracts } = useSnapshot(SealCredStore)
  const ledgerToOwnedAddresses = dataShapeObject((ledgerName) =>
    ledgerToDerivativeContracts[ledgerName].filter((contractAddress) =>
      contractsOwned.includes(contractAddress)
    )
  )

  const hasMinted = Object.values(ledgerToOwnedAddresses).some(
    (contracts) => contracts.length > 0
  )

  return {
    ledgerToOwnedAddresses,
    hasMinted,
  }
}
