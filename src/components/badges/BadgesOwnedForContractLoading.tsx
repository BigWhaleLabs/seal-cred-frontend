import BadgeCard from 'components/badges/BadgeCard'
import BadgeWrapper from 'components/badges/BadgeWrapper'
import Button from 'components/Button'
import ContractName from 'components/ContractName'
import Erc721Badge from 'icons/Erc721Badge'
import ExternalLink from 'components/ExternalLink'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

export default function ({ contractAddress }: { contractAddress: string }) {
  return (
    <BadgeWrapper minted={false}>
      <BadgeCard
        top={<Erc721Badge />}
        text={
          <ExternalLink url={getEtherscanAddressUrl(contractAddress)}>
            <ContractName address={contractAddress} clearType />
          </ExternalLink>
        }
        bottom={
          <Button small type="primary" loading>
            Fetching...
          </Button>
        }
      />
    </BadgeWrapper>
  )
}
