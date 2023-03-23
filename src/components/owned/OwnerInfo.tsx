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
      <Card onlyWrap shadow color="secondary">
        <CardTitle
          subtitle="This NFT is not supported"
          title="Unsupported NFT"
        />
      </Card>
    )
  }

  const { original, type } = badge
  const { badgeType, network } = data[type]
  const { ownerContent: OwnerContent, ownerTitle: OwnerTitle } =
    badgeConfig[badgeType]

  return (
    <Card
      onlyWrap
      shadow
      color="secondary"
      paddingType="normal"
      spinner={{
        avoidCardContent: true,
        text: 'Certified with SealCred ZK Proofs',
      }}
    >
      <HeaderText extraLeading>
        <OwnerTitle derivative={derivativeAddress} />
      </HeaderText>
      <BadgeContent>
        <OwnerContent network={network} original={original} />
      </BadgeContent>
      <HorizontalRule color="primary-semi-dimmed" />
      <div className={walletBox}>
        <Smile />
        <div className={walletAddress}>
          <BodyText small>Wallet address</BodyText>
          <OwnedBadgeAddress
            derivativeAddress={derivativeAddress}
            network={Network.Goerli}
            tokenId={tokenId}
          />
        </div>
      </div>
    </Card>
  )
}
