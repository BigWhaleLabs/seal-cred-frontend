import BadgeCard from 'components/badges/BadgeCard'
import BadgeWrapper from 'components/badges/BadgeWrapper'
import Button from 'components/ui/Button'
import ContractName from 'components/ui/ContractName'
import Erc721Badge from 'icons/Erc721Badge'
import ExternalLink from 'components/ui/ExternalLink'
import Network from 'models/Network'
import getEtherscanAddressUrl from 'helpers/network/getEtherscanAddressUrl'

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
