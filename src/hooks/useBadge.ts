import { DataKey } from 'models/DataKey'
import { useMemo } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'

export interface BaseBadgeContract {
  type: DataKey
  derivative: string
  original: string
}

export default function (derivative: string) {
  const { ledgers } = useSnapshot(SealCredStore)

  return useMemo(() => {
    for (const [ledgerName, ledger] of Object.entries(ledgers)) {
      for (const original of Object.keys(ledger)) {
        if (ledger[original] === derivative) {
          return {
            derivative,
            original,
            type: ledgerName,
          } as BaseBadgeContract
        }
      }
    }
    return null
  }, [ledgers, derivative])
}
