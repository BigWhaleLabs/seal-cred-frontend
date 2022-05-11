import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'

export default function (contractType: 'original' | 'derivative') {
  const { account } = useSnapshot(WalletStore)
  const contractsToOwnersMaps =
    contractType === 'original'
      ? useSnapshot(SealCredStore).originalContractsToOwnersMaps
      : useSnapshot(SealCredStore).derivativeContractsToOwnersMaps
  if (!account) {
    return []
  }
  return Object.entries(contractsToOwnersMaps)
    .filter(([_, owners]) => Object.values(owners).includes(account))
    .map(([contractAddress]) => contractAddress)
}
