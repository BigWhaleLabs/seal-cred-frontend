import BaseProof from 'helpers/proofs/BaseProof'
import ContractName from 'components/ContractName'
import ERC721Proof from 'helpers/proofs/ERC721Proof'
import EmailProof from 'helpers/proofs/EmailProof'
import ExternalLink from 'components/ExternalLink'
import Network from 'models/Network'
import getEtherscanAddressUrl from 'helpers/network/getEtherscanAddressUrl'

function ProofName({ badge }: { badge: BaseProof }) {
  if (badge instanceof ERC721Proof)
    return (
      <ContractName hyphens address={badge.contract} network={Network.Goerli} />
    )
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
          hyphens
          address={derivativeAddress}
          clearType
          network={Network.Goerli}
        />
      </ExternalLink>
    )

  if (!proof) return null

  return <ProofName badge={proof} />
}
