import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'

export default function (contractType: 'original' | 'derivative') {
  const { account } = useSnapshot(WalletStore)
  if (!account) {
    return []
  }
  const { ledger } = useSnapshot(SealCredStore)
  if (!Object.keys(ledger).length) {
    return []
  }
  const contractAddresses =
    contractType === 'original'
      ? Object.keys(ledger)
      : Object.values(ledger).map(
          ({ derivativeContract }) => derivativeContract.address
        )
  const contractsToOwnersMaps =
    contractType === 'original'
      ? useSnapshot(SealCredStore).originalContractsToOwnersMaps
      : useSnapshot(SealCredStore).derivativeContractsToOwnersMaps
  return contractAddresses.filter((address) =>
    Object.values(contractsToOwnersMaps[address]).includes(account)
  )
}
