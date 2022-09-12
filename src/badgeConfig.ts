import { BadgeSourceType } from 'data'
import EmailBadge from 'icons/EmailBadge'
import Erc721Badge from 'icons/Erc721Badge'
import Network from '@big-whale-labs/stores/dist/models/Network'
import OwnerContentERC721 from 'components/owned/OwnerContentERC721'
import OwnerContentEmail from 'components/owned/OwnerContentEmail'
import OwnerContentFarcaster from 'components/owned/OwnerContentFarcaster'
import OwnerTitleERC721 from 'components/owned/OwnerTitleERC721'
import OwnerTitleEmail from 'components/owned/OwnerTitleEmail'
import OwnerTitleFarcaster from 'components/owned/OwnerTitleFarcaster'

export default {
  [BadgeSourceType.ERC721]: {
    title: ({ network }: { network: Network }) => `${network} NFT derivatives`,
    proofTitle: ({ network }: { network: Network }) => network,
    ownerTitle: OwnerTitleERC721,
    ownerContent: OwnerContentERC721,
    proofIcon: Erc721Badge,
  },
  [BadgeSourceType.Email]: {
    title: () => 'Email derivatives',
    proofTitle: () => 'Email',
    ownerTitle: OwnerTitleEmail,
    ownerContent: OwnerContentEmail,
    proofIcon: EmailBadge,
  },
  [BadgeSourceType.Farcaster]: {
    title: () => 'Farcaster derivatives',
    proofTitle: () => 'Farcaster',
    ownerTitle: OwnerTitleFarcaster,
    ownerContent: OwnerContentFarcaster,
    proofIcon: Erc721Badge,
  },
}
