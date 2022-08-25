import { isAddress } from 'ethers/lib/utils'
import ContractName from 'components/ui/ContractName'
import ExternalLink from 'components/ui/ExternalLink'
import Network from 'models/Network'
import Proof from 'models/Proof'
import getEtherscanAddressUrl from 'helpers/network/getEtherscanAddressUrl'

function ProofName({ badge }: { badge: Proof }) {
  if (isAddress(badge.origin))
    return (
      <ContractName hyphens address={badge.origin} network={Network.Goerli} />
    )
  return <>@{badge.origin}</>
}

export default function ({
  derivativeAddress,
  proof,
}: {
  derivativeAddress?: string
  proof?: Proof
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
