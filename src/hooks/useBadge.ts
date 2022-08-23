import { DataKeys } from 'models/DataKeys'
import { useMemo } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'

export interface BaseBadgeContract {
  type: DataKeys
  derivative: string
  original: string
}

export default function (derivative: string) {
  const { ledgers } = useSnapshot(SealCredStore)

  return useMemo(() => {
    for (const [ledgerName, ledger] of Object.entries(ledgers)) {
      for (const original of Object.keys(ledger)) {
        if (ledger[original] === derivative)
          return {
            type: ledgerName,
            derivative,
            original,
          } as BaseBadgeContract
      }
    }
    return null
  }, [ledgers, derivative])
}
