import EmailBadge from 'icons/EmailBadge'
import Erc721Badge from 'icons/Erc721Badge'
import Network from 'models/Network'
import env from 'helpers/env'

export enum BadgeSourceType {
  Email = 'Email',
  ERC721 = 'ERC721',
}

export default {
  ExternalERC721: {
    ledger: env.VITE_SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS,
    title: 'Mainnet NFT derivatives',
    ownerTitle: 'This wallet owns a {derivative}',
    ownerContent:
      'This is a zkNFT derivative. It means this person has been verified to own at least one ‘{original}‘ Mainnet NFT.',
    proofIcon: Erc721Badge,
    badgeType: BadgeSourceType.ERC721,
    network: Network.Mainnet,
  },
  Email: {
    ledger: env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
    title: 'Email derivatives',
    ownerTitle: 'This wallet belongs to someone with {derivative}',
    ownerContent:
      'This is a zkNFT derivative of an email. It means this person has been verified own a ‘{original}‘ email.',
    proofIcon: EmailBadge,
    badgeType: BadgeSourceType.Email,
    network: Network.Goerli,
  },
  ERC721: {
    ledger: env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS,
    title: 'Goerli NFT derivatives',
    ownerTitle: 'This wallet owns a {derivative}',
    ownerContent:
      'This is a zkNFT derivative. It means this person has been verified to own at least one ‘{original}‘ Goerli NFT.',
    proofIcon: Erc721Badge,
    badgeType: BadgeSourceType.ERC721,
    network: Network.Goerli,
  },
}
