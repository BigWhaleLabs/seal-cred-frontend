import ContractNameByNetwork from 'components/ui/ContractNameByNetwork'
import Network from 'models/Network'

export default function ({ derivative }: { derivative: string }) {
  return (
    <>
      This wallet belongs to someone with ‘
      <ContractNameByNetwork address={derivative} network={Network.Goerli} />‘
    </>
  )
}
