import { BadgeSourceType } from 'data'
import BaseProof from 'helpers/proofs/BaseProof'
import ContractName from 'components/ui/ContractName'
import ExternalLink from 'components/ui/ExternalLink'
import Network from 'models/Network'
import getEtherscanAddressUrl from 'helpers/network/getEtherscanAddressUrl'

function ProofName({ badge }: { badge: BaseProof }) {
  if (badge.type === BadgeSourceType.ERC721)
    return (
      <ContractName hyphens address={badge.origin} network={Network.Goerli} />
    )
  if (badge.type === BadgeSourceType.Email) return <>@{badge.origin}</>
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
