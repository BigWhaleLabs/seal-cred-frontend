import Network from 'models/Network'

export default function <T, A>(
  attestationSource: Network,
  goerliOption: T,
  mainnetOption: A
) {
  switch (attestationSource) {
    case Network.Goerli:
      return goerliOption
    case Network.Mainnet:
      return mainnetOption
  }
}
