import ContractNameByNetwork from 'components/ui/ContractNameByNetwork'
import Network from 'models/Network'

export default function ({ original }: { original: string }) {
  return (
    <>
      This is a zkNFT derivative of an email. It means this person has been
      verified own a ‘
      <ContractNameByNetwork address={original} network={Network.Goerli} />‘
      email.
    </>
  )
}
