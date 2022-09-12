import ContractNameByNetwork from 'components/ui/ContractNameByNetwork'
import Network from 'models/Network'

export default function ({ derivative }: { derivative: string }) {
  return (
    <>
      This wallet owns a ‘
      <ContractNameByNetwork address={derivative} network={Network.Goerli} />‘
    </>
  )
}
