import { AccentText, BodyText, HeaderText } from 'components/Text'
import Card from 'components/Card'
import CardTitle from 'components/CardTitle'
import ContractName from 'components/ContractName'
import ExternalLink from 'components/ExternalLink'
import HorizontalRule from 'components/HorizontalRule'
import Network from 'models/Network'
import OwnedBadgeAddress from 'components/owned/OwnedBadgeAddress'
import ShareCTAButtons from 'components/owned/ShareCTAButtons'
import Smile from 'icons/Smile'
import classnames, {
  alignItems,
  display,
  flexDirection,
  space,
} from 'classnames/tailwind'
import data from 'data'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import handleError from 'helpers/handleError'
import useBadgeContracts, { BaseBadgeContract } from 'hooks/useBadgeContracts'

const walletBox = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-4'),
  alignItems('items-center')
)
const walletAddress = classnames(display('flex'), flexDirection('flex-col'))

function BadgeTitle({ badge }: { badge: BaseBadgeContract }) {
  if (badge.type === 'Email') {
    return (
      <>
        <HeaderText extraLeading>
          This wallet belongs to someone with{' '}
          <ExternalLink
            url={getEtherscanAddressUrl(badge.derivative, Network.Goerli)}
          >
            <AccentText bold color="text-secondary">
              <ContractName
                hyphens
                address={badge.derivative}
                network={Network.Goerli}
              />
            </AccentText>
          </ExternalLink>
        </HeaderText>
      </>
    )
  }

  return (
    <>
      <HeaderText extraLeading>
        <span className={display('md:block')}>This wallet owns </span>a{' '}
        <ExternalLink
          url={getEtherscanAddressUrl(badge.derivative, Network.Goerli)}
        >
          <AccentText bold color="text-secondary">
            <ContractName
              hyphens
              address={badge.derivative}
              network={Network.Goerli}
            />
          </AccentText>
        </ExternalLink>
      </HeaderText>
    </>
  )
}

function BadgeContent({ badge }: { badge: BaseBadgeContract }) {
  if (badge.type === 'Email') {
    return (
      <BodyText>
        This is a zkNFT derivative of an email. It means this person has been
        verified own a ‘
        <AccentText color="text-secondary">{badge.original}</AccentText>‘ email.
        <ShareCTAButtons address={badge.derivative} network={Network.Goerli} />
      </BodyText>
    )
  }

  const network = data[badge.type].source.network

  return (
    <BodyText>
      This is a zkNFT derivative. It means this person has been verified to own
      at least one ‘
      <ExternalLink url={getEtherscanAddressUrl(badge.original, network)}>
        <AccentText color="text-secondary">
          <ContractName address={badge.original} network={network} />
        </AccentText>
      </ExternalLink>
      ‘ {network[0].toUpperCase() + network.slice(1)} NFT.
      <ShareCTAButtons address={badge.original} network={Network.Goerli} />
    </BodyText>
  )
}

export default function ({
  derivativeAddress,
  tokenId,
}: {
  derivativeAddress: string
  tokenId: string
}) {
  const contractToBadge = useBadgeContracts()
  const badge = contractToBadge[derivativeAddress]

  if (!badge) {
    handleError('Looks like this contract was removed')
    return (
      <Card color="secondary" shadow onlyWrap>
        <CardTitle
          title="Unsupported NFT"
          subtitle="This NFT is not supported"
        />
      </Card>
    )
  }

  return (
    <Card
      color="secondary"
      shadow
      paddingType="normal"
      onlyWrap
      noArcTextSpace
      spinner="Certified with SealCred ZK Proofs"
    >
      <BadgeTitle badge={badge} />
      <BadgeContent badge={badge} />
      <HorizontalRule color="primary-semi-dimmed" />
      <div className={walletBox}>
        <Smile />
        <div className={walletAddress}>
          <BodyText small>Wallet address</BodyText>
          <OwnedBadgeAddress
            tokenId={tokenId}
            derivativeAddress={derivativeAddress}
            network={Network.Goerli}
          />
        </div>
      </div>
    </Card>
  )
}
