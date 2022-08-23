import { BadgesNetwork } from 'stores/ContractsStore'
import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import dataShapeObject from 'helpers/contracts/dataShapeObject'
import useContractsOwned from 'hooks/useContractsOwned'

export default function () {
  const ownedAddresses = useContractsOwned(BadgesNetwork)
  const { ledgers } = useSnapshot(SealCredStore)

  const ledgerToMintedAddresses = dataShapeObject((ledgerName) =>
    Object.values(ledgers[ledgerName]).filter((contractAddress) =>
      ownedAddresses.includes(contractAddress)
    )
  )

  const hasMinted = Object.values(ledgerToMintedAddresses).some(
    (addresses) => addresses.length > 0
  )

  return {
    ledgerToMintedAddresses,
    hasMinted,
  }
}
