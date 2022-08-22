import Network from '@big-whale-labs/stores/dist/models/Network'
import env from 'helpers/env'

export enum BadgeSourceType {
  Email = 'Email',
  ERC721 = 'ERC721',
}

export default {
  ExternalERC721: {
    ledger: env.VITE_SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS,
    title: 'Mainnet NFT derivatives',
    source: {
      type: BadgeSourceType.ERC721,
      network: Network.Mainnet,
    },
  },
  Email: {
    ledger: env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
    title: 'Email derivatives',
    source: {
      type: BadgeSourceType.Email,
      network: Network.Goerli,
    },
  },
  ERC721: {
    ledger: env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS,
    title: 'Goerli NFT derivatives',
    source: {
      type: BadgeSourceType.ERC721,
      network: Network.Goerli,
    },
  },
}
