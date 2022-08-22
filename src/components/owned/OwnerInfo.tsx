import { AccentText, BodyText, HeaderText } from 'components/Text'
import BaseBadgeContract from 'helpers/BaseBadgeContract'
import Card from 'components/Card'
import CardTitle from 'components/CardTitle'
import ContractName from 'components/ContractName'
import ERC721BadgeContract from 'helpers/ERC721BadgeContract'
import EmailBadgeContract from 'helpers/EmailBadgeContract'
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
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import handleError from 'helpers/handleError'
import useBadgeContracts from 'hooks/useBadgeContracts'

const walletBox = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-4'),
  alignItems('items-center')
)
const walletAddress = classnames(display('flex'), flexDirection('flex-col'))

function BadgeTitle({ badge }: { badge: BaseBadgeContract }) {
  if (badge instanceof EmailBadgeContract) {
    return (
      <>
        <HeaderText extraLeading>
          This wallet belongs to someone with{' '}
          <ExternalLink
            url={getEtherscanAddressUrl(badge.address, Network.Goerli)}
          >
            <AccentText bold color="text-secondary">
              <ContractName
                hyphens
                address={badge.address}
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
          url={getEtherscanAddressUrl(badge.address, Network.Goerli)}
        >
          <AccentText bold color="text-secondary">
            <ContractName
              hyphens
              address={badge.address}
              network={Network.Goerli}
            />
          </AccentText>
        </ExternalLink>
      </HeaderText>
    </>
  )
}

function BadgeContent({ badge }: { badge: BaseBadgeContract }) {
  if (badge instanceof EmailBadgeContract) {
    return (
      <BodyText>
        This is a zkNFT derivative of an email. It means this person has been
        verified own a ‘
        <AccentText color="text-secondary">{badge.domain}</AccentText>‘ email.
        <ShareCTAButtons />
      </BodyText>
    )
  }

  if (badge instanceof ERC721BadgeContract) {
    return (
      <BodyText>
        This is a zkNFT derivative. It means this person has been verified to
        own at least one ‘
        <ExternalLink
          url={getEtherscanAddressUrl(badge.originalERC721, badge.network)}
        >
          <AccentText color="text-secondary">
            <ContractName
              address={badge.originalERC721}
              network={badge.network}
            />
          </AccentText>
        </ExternalLink>
        ‘ {badge.network[0].toUpperCase() + badge.network.slice(1)} NFT.
        <ShareCTAButtons />
      </BodyText>
    )
  }

  return null
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
            derivativeAddress={badge.address}
            network={Network.Goerli}
          />
        </div>
      </div>
    </Card>
  )
}
