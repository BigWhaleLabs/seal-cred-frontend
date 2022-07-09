import BaseProof from 'helpers/BaseProof'
import ContractName from 'components/ContractName'
import ERC721Proof from 'helpers/ERC721Proof'
import EmailProof from 'helpers/EmailProof'
import ExternalLink from 'components/ExternalLink'
import Network from 'models/Network'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

function ProofName({ badge, network }: { badge: BaseProof; network: Network }) {
  if (badge instanceof ERC721Proof)
    return <ContractName address={badge.contract} network={network} />
  if (badge instanceof EmailProof) return <>@{badge.domain}</>
  return <>Unknown</>
}

export default function ({
  derivativeAddress,
  proof,
  network,
}: {
  derivativeAddress?: string
  proof?: BaseProof
  network: Network
}) {
  if (derivativeAddress)
    return (
      <ExternalLink url={getEtherscanAddressUrl(derivativeAddress, network)}>
        <ContractName address={derivativeAddress} clearType network={network} />
      </ExternalLink>
    )

  if (!proof) return null

  return <ProofName badge={proof} network={network} />
}
