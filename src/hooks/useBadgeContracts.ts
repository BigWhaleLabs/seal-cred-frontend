import { useMemo } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import data from 'data'

export interface BaseBadgeContract {
  type: keyof typeof data
  derivative: string
  original: string
}

export default function () {
  const { ledgers } = useSnapshot(SealCredStore)

  return useMemo(() => {
    return Object.entries(ledgers).reduce(
      (res, [key, ledger]) =>
        Object.values(ledger).reduce(
          (result, { derivative, original }) => ({
            ...result,
            [derivative]: {
              type: key as keyof typeof data,
              derivative,
              original,
            },
          }),
          res
        ),
      {} as {
        [address: string]: {
          type: keyof typeof data
          derivative: string
          original: string
        }
      }
    )
  }, [ledgers])
}
