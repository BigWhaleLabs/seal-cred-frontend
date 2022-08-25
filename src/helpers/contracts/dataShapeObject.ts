import { DataKey } from 'models/DataKey'
import data from 'data'

type ValueOf<T> = T[keyof T]

export default function dataShapeObject<V>(
  transformer: (ledgerName: DataKey, record: ValueOf<typeof data>) => V
) {
  const ledgersName = Object.keys(data) as DataKey[]

  return ledgersName.reduce(
    (res, ledgerName) => ({
      ...res,
      [ledgerName]: transformer(ledgerName, data[ledgerName]),
    }),
    {} as {
      [ledgerName in DataKey]: V
    }
  )
}
