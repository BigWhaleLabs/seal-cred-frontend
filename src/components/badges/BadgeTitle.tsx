import BaseProof from 'helpers/BaseProof'
import ContractName from 'components/ContractName'
import ERC721Proof from 'helpers/ERC721Proof'
import EmailProof from 'helpers/EmailProof'
import ExternalLink from 'components/ExternalLink'
import Network from 'models/Network'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

function ProofName({ badge }: { badge: BaseProof }) {
  if (badge instanceof ERC721Proof)
    return <ContractName address={badge.contract} network={Network.Goerli} />
  if (badge instanceof EmailProof) return <>@{badge.domain}</>
  return <>Unknown</>
}

export default function ({
  derivativeAddress,
  proof,
}: {
  derivativeAddress?: string
  proof?: BaseProof
}) {
  if (derivativeAddress)
    return (
      <ExternalLink
        url={getEtherscanAddressUrl(derivativeAddress, Network.Goerli)}
      >
        <ContractName
          address={derivativeAddress}
          clearType
          network={Network.Goerli}
        />
      </ExternalLink>
    )

  if (!proof) return null

  return <ProofName badge={proof} />
}
