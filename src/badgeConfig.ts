import { BadgeSourceType } from 'data'
import EmailBadge from 'icons/EmailBadge'
import Erc721Badge from 'icons/Erc721Badge'
import Network from '@big-whale-labs/stores/dist/models/Network'
import OwnerContentERC721 from 'components/owned/OwnerContentERC721'
import OwnerContentEmail from 'components/owned/OwnerContentEmail'
import OwnerTitleERC721 from 'components/owned/OwnerTitleERC721'
import OwnerTitleEmail from 'components/owned/OwnerTitleEmail'

export default {
  [BadgeSourceType.ERC721]: {
    title: ({ network }: { network: Network }) => `${network} NFT derivatives`,
    proofTitle: ({ network }: { network: Network }) => `${network} NFTs`,
    ownerTitle: OwnerTitleERC721,
    ownerContent: OwnerContentERC721,
    proofIcon: Erc721Badge,
  },
  [BadgeSourceType.Email]: {
    title: () => 'Email derivatives',
    proofTitle: () => 'Email NFTs',
    ownerTitle: OwnerTitleEmail,
    ownerContent: OwnerContentEmail,
    proofIcon: EmailBadge,
  },
}
