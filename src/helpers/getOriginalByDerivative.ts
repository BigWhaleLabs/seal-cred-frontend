import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'

export default function (contractAddress: string, reverse?: boolean) {
  const { ledger } = useSnapshot(SealCredStore)
  if (!Object.keys(ledger).length) return

  const record = Object.values(ledger).find(
    ({ derivativeContract, originalContract }) => {
      return reverse
        ? originalContract.address === contractAddress
        : derivativeContract.address === contractAddress
    }
  )

  return reverse
    ? record?.derivativeContract.address
    : record?.originalContract.address
}
