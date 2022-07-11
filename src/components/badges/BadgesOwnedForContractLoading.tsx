import BadgeCard from 'components/badges/BadgeCard'
import BadgeWrapper from 'components/badges/BadgeWrapper'
import Button from 'components/Button'
import ContractName from 'components/ContractName'
import Erc721Badge from 'icons/Erc721Badge'
import ExternalLink from 'components/ExternalLink'
import Network from 'models/Network'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

export default function ({ contractAddress }: { contractAddress: string }) {
  return (
    <BadgeWrapper minted={false}>
      <BadgeCard
        top={<Erc721Badge />}
        text={
          <ExternalLink
            url={getEtherscanAddressUrl(contractAddress, Network.Goerli)}
          >
            <ContractName
              address={contractAddress}
              clearType
              network={Network.Goerli}
            />
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
