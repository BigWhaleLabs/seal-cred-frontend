import { DataKey } from 'models/DataKey'
import data from 'data'

type ValueOf<T> = T[keyof T]

export const dataKeys = Object.keys(data) as DataKey[]

export default function dataShapeObject<V>(
  transformer: (ledgerName: DataKey, record: ValueOf<typeof data>) => V
) {
  return dataKeys.reduce(
    (res, ledgerName) => ({
      ...res,
      [ledgerName]: transformer(ledgerName, data[ledgerName]),
    }),
    {} as {
      [ledgerName in DataKey]: V
    }
  )
}
