import { DataKeys } from 'models/DataKeys'
import data from 'data'

type ValueOf<T> = T[keyof T]

export default function <V>(
  transformer: (contractName: DataKeys, record: ValueOf<typeof data>) => V
) {
  const contractName = Object.keys(data) as DataKeys[]

  return contractName.reduce(
    (res, contractName) => ({
      ...res,
      [contractName]: transformer(contractName, data[contractName]),
    }),
    {} as {
      [contractName: string]: V
    }
  )
}
