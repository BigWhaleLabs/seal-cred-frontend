export default function (contractName: string) {
  return contractName.replace(/ (email|\(derivative\))$/, '')
}
