import BadgeCard from 'components/badges/BadgeCard'
import BadgeWrapper from 'components/badges/BadgeWrapper'
import Button from 'components/Button'
import ContractName from 'components/ContractName'
import Erc721Badge from 'icons/Erc721Badge'
import ExternalLink from 'components/ExternalLink'
import Network from 'models/Network'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

export default function ({
  contractAddress,
  network,
}: {
  contractAddress: string
  network: Network
}) {
  return (
    <BadgeWrapper minted={false}>
      <BadgeCard
        top={<Erc721Badge />}
        text={
          <ExternalLink url={getEtherscanAddressUrl(contractAddress, network)}>
            <ContractName
              address={contractAddress}
              clearType
              network={network}
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
