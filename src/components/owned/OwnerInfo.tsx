import { BodyText, HeaderText } from 'components/ui/Text'
import { handleError } from '@big-whale-labs/frontend-utils'
import Card from 'components/ui/Card'
import CardTitle from 'components/ui/CardTitle'
import ChildrenProp from 'models/ChildrenProp'
import HorizontalRule from 'components/ui/HorizontalRule'
import Network from 'models/Network'
import OwnedBadgeAddress from 'components/owned/OwnedBadgeAddress'
import ShareCTAButtons from 'components/owned/ShareCTAButtons'
import Smile from 'icons/Smile'
import badgeConfig from 'badgeConfig'
import classnames, {
  alignItems,
  display,
  flexDirection,
  space,
} from 'classnames/tailwind'
import data from 'data'
import useBadge from 'hooks/useBadge'

const walletBox = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-4'),
  alignItems('items-center')
)
const walletAddress = classnames(display('flex'), flexDirection('flex-col'))

function BadgeContent({ children }: ChildrenProp) {
  return (
    <BodyText>
      {children}
      <ShareCTAButtons />
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
  const badge = useBadge(derivativeAddress)

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

  const { type, original } = badge
  const { network, badgeType } = data[type]
  const { ownerTitle: OwnerTitle, ownerContent: OwnerContent } =
    badgeConfig[badgeType]

  return (
    <Card
      color="secondary"
      shadow
      paddingType="normal"
      onlyWrap
      spinner={{
        text: 'Certified with SealCred ZK Proofs',
        avoidCardContent: true,
      }}
    >
      <HeaderText extraLeading>
        <OwnerTitle derivative={derivativeAddress} />
      </HeaderText>
      <BadgeContent>
        <OwnerContent original={original} network={network} />
      </BadgeContent>
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
