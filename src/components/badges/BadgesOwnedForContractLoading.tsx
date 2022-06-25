import BadgeCard from 'components/badges/BadgeCard'
import BadgeIcon from 'icons/Erc721Badge'
import BadgeWrapper from 'components/badges/BadgeWrapper'
import Button from 'components/Button'
import ContractName from 'components/ContractName'
import ExternalLink from 'components/ExternalLink'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

export default function ({ contractAddress }: { contractAddress: string }) {
  return (
    <BadgeWrapper minted={false}>
      <BadgeCard
        top={<BadgeIcon />}
        leanLeft
        text={
          <ExternalLink url={getEtherscanAddressUrl(contractAddress)}>
            <ContractName address={contractAddress} />
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
