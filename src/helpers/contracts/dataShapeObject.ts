import { DataKeys } from 'models/DataKeys'
import data from 'data'

type ValueOf<T> = T[keyof T]

export default function dataShapeObject<V>(
  transformer: (ledgerName: DataKeys, record: ValueOf<typeof data>) => V
) {
  const ledgersName = Object.keys(data) as DataKeys[]

  return ledgersName.reduce(
    (res, ledgerName) => ({
      ...res,
      [ledgerName]: transformer(ledgerName, data[ledgerName]),
    }),
    {} as {
      [ledgerName in DataKeys]: V
    }
  )
}
