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
        bottom={
          <Button loading small type="primary">
            Fetching...
          </Button>
        }
        text={
          <ExternalLink
            url={getEtherscanAddressUrl(contractAddress, Network.Goerli)}
          >
            <ContractName
              clearType
              address={contractAddress}
              network={Network.Goerli}
            />
          </ExternalLink>
        }
      />
    </BadgeWrapper>
  )
}
