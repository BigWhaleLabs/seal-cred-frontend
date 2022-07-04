import { AccentText, BodyText, HeaderText } from 'components/Text'
import BaseBadgeContract from 'helpers/BaseBadgeContract'
import Card from 'components/Card'
import CardTitle from 'components/CardTitle'
import ContractName from 'components/ContractName'
import ERC721BadgeContract from 'helpers/ERC721BadgeContract'
import EmailBadgeContract from 'helpers/EmailBadgeContract'
import ExternalLink from 'components/ExternalLink'
import OwnedBadgeAddress from 'components/owned/OwnedBadgeAddress'
import Smile from 'icons/Smile'
import classnames, {
  alignItems,
  borderColor,
  display,
  flexDirection,
  space,
  textOverflow,
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
const badgeNaneWrapper = classnames(textOverflow('truncate'))

const badgeNameWrapperStyles = {
  hyphens: 'auto', // to enable hyphens
  fontSize: 'calc(20px + (34 - 20) * ((100vw - 280px) / (6000 - 280)))', // to calculate font size based on viewport width
}

function BadgeTitle({ badge }: { badge: BaseBadgeContract }) {
  if (badge instanceof EmailBadgeContract) {
    return (
      <>
        <HeaderText extraLeading>
          This wallet belongs to someone with{' '}
          <ExternalLink url={getEtherscanAddressUrl(badge.address)}>
            <AccentText bold color="text-secondary">
              <div className={badgeNaneWrapper} style={badgeNameWrapperStyles}>
                <ContractName address={badge.address} />
              </div>
            </AccentText>
          </ExternalLink>
        </HeaderText>
      </>
    )
  }

  return (
    <>
      <HeaderText extraLeading>
        This wallet owns a{' '}
        <ExternalLink url={getEtherscanAddressUrl(badge.address)}>
          <AccentText bold color="text-secondary">
            <div className={badgeNaneWrapper} style={badgeNameWrapperStyles}>
              <ContractName address={badge.address} />
            </div>
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
      </BodyText>
    )
  }

  if (badge instanceof ERC721BadgeContract) {
    return (
      <BodyText>
        This is a zkNFT derivative. It means this person has been verified to
        own at least one ‘
        <ExternalLink url={getEtherscanAddressUrl(badge.originalERC721)}>
          <AccentText color="text-secondary">
            <ContractName address={badge.originalERC721} />
          </AccentText>
        </ExternalLink>
        ‘ NFT.
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
      onlyWrap
      spinner="Certified with SealCred ZK Proof"
    >
      <BadgeTitle badge={badge} />
      <BadgeContent badge={badge} />
      <hr className={borderColor('border-primary-semi-dimmed')} />
      <div className={walletBox}>
        <Smile />
        <div className={walletAddress}>
          <BodyText small>Wallet address</BodyText>
          <OwnedBadgeAddress
            tokenId={tokenId}
            derivativeAddress={badge.address}
          />
        </div>
      </div>
    </Card>
  )
}
