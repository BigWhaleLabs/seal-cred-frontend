import data from 'data'

type ValueOf<T> = T[keyof T]
type DataKey = keyof typeof data

export default function <V>(
  transformer: (contractName: DataKey, record: ValueOf<typeof data>) => V
) {
  const contractName = Object.keys(data) as DataKey[]

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
