import { DataKeys } from 'models/DataKeys'
import { useMemo } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'

export interface BaseBadgeContract {
  type: DataKeys
  derivative: string
  original: string
}

export default function () {
  const { ledgers } = useSnapshot(SealCredStore)

  return useMemo(() => {
    return Object.entries(ledgers).reduce(
      (res, [key, ledger]) =>
        Object.entries(ledger).reduce(
          (result, [original, derivative]) => ({
            ...result,
            [derivative]: {
              type: key as DataKeys,
              derivative,
              original,
            },
          }),
          res
        ),
      {} as {
        [address: string]: {
          type: DataKeys
          derivative: string
          original: string
        }
      }
    )
  }, [ledgers])
}
