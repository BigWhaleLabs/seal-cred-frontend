import Network from 'models/Network'
import createERC721Badge from 'helpers/contracts/createERC721Badge'
import createEmailBadge from 'helpers/contracts/createEmailBadge'
import createExternalERC721Badge from 'helpers/contracts/createExternalERC721Badge'
import createFarcasterBadge from 'helpers/contracts/createFarcasterBadge'
import env from 'helpers/env'
import generateERC721 from 'helpers/proofs/generateERC721'
import generateEmail from 'helpers/proofs/generateEmail'
import generateFarcaster from 'helpers/proofs/generateFarcaster'

export enum BadgeSourceType {
  Farcaster = 'Farcaster',
  Email = 'Email',
  ERC721 = 'ERC721',
}

export default {
  ExternalERC721: {
    ledger: env.VITE_SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS,
    badgeType: BadgeSourceType.ERC721,
    network: Network.Mainnet,
    mint: createExternalERC721Badge,
    createProof: generateERC721,
  },
  ERC721: {
    ledger: env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS,
    badgeType: BadgeSourceType.ERC721,
    network: Network.Goerli,
    mint: createERC721Badge,
    createProof: generateERC721,
  },
  Email: {
    ledger: env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
    badgeType: BadgeSourceType.Email,
    network: Network.Goerli,
    mint: createEmailBadge,
    createProof: generateEmail,
  },
  Farcaster: {
    ledger: env.VITE_SC_FARCASTER_LEDGER_CONTRACT_ADDRESS,
    badgeType: BadgeSourceType.Farcaster,
    network: Network.Goerli,
    mint: createFarcasterBadge,
    createProof: generateFarcaster,
  },
}
