import ContractNameByNetwork from 'components/ui/ContractNameByNetwork'
import Network from 'models/Network'

export default function ({
  network,
  original,
}: {
  original: string
  network: Network
}) {
  return (
    <>
      This is a zkNFT derivative. It means this person has been verified to own
      at least one ‘
      <ContractNameByNetwork
        address={original}
        network={Network.Goerli}
      />‘ {network} NFT.
    </>
  )
}
