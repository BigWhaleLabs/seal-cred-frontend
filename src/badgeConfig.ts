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
    ownerContent: OwnerContentERC721,
    ownerTitle: OwnerTitleERC721,
    proofIcon: Erc721Badge,
    proofTitle: ({ network }: { network: Network }) => network,
    title: ({ network }: { network: Network }) => `${network} NFT derivatives`,
  },
  [BadgeSourceType.Email]: {
    ownerContent: OwnerContentEmail,
    ownerTitle: OwnerTitleEmail,
    proofIcon: EmailBadge,
    proofTitle: () => 'Email',
    title: () => 'Email derivatives',
  },
}
