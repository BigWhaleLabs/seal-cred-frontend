import BaseProof from 'helpers/BaseProof'
import ContractName from 'components/ContractName'
import ERC721Proof from 'helpers/ERC721Proof'
import EmailProof from 'helpers/EmailProof'
import ExternalLink from 'components/ExternalLink'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

function ProofName({ badge }: { badge: BaseProof }) {
  if (badge instanceof ERC721Proof)
    return (
      <>
        <ContractName address={badge.contract} /> (derivative)
      </>
    )
  if (badge instanceof EmailProof) return <>@{badge.domain} email</>
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
      <ExternalLink url={getEtherscanAddressUrl(derivativeAddress)}>
        <ContractName address={derivativeAddress} />
      </ExternalLink>
    )

  if (!proof) return null

  return <ProofName badge={proof} />
}
