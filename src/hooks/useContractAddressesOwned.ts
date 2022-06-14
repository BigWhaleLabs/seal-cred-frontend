import { useSnapshot } from 'valtio'
import ContractsStore from 'stores/ContractsStore'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'

export default function (contractType: 'original' | 'derivative') {
  const { account } = useSnapshot(WalletStore)
  if (!account) {
    return []
  }
  if (contractType === 'original') {
    const { contractsOwned } = useSnapshot(ContractsStore)
    return contractsOwned
  }
  const { ledger } = useSnapshot(SealCredStore)
  if (!Object.keys(ledger).length) {
    return []
  }
  const contractAddresses = Object.values(ledger).map(
    ({ derivativeContract }) => derivativeContract.address
  )
  const contractsToOwnersMaps =
    useSnapshot(SealCredStore).derivativeContractsToOwnersMaps
  return contractAddresses.filter((address) =>
    Object.values(contractsToOwnersMaps[address]).includes(account)
  )
}
