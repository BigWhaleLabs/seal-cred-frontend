/* eslint-disable sort-keys-fix/sort-keys-fix */
import Network from 'models/Network'
import createERC721Badge from 'helpers/contracts/createERC721Badge'
import createEmailBadge from 'helpers/contracts/createEmailBadge'
import createExternalERC721Badge from 'helpers/contracts/createExternalERC721Badge'
import env from 'helpers/env'
import generateERC721 from 'helpers/proofs/generateERC721'
import generateEmail from 'helpers/proofs/generateEmail'

export enum BadgeSourceType {
  Email = 'Email',
  ERC721 = 'ERC721',
}

export default {
  ExternalERC721: {
    badgeType: BadgeSourceType.ERC721,
    createProof: generateERC721,
    ledger: env.VITE_SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS,
    mint: createExternalERC721Badge,
    network: Network.Mainnet,
  },
  ERC721: {
    badgeType: BadgeSourceType.ERC721,
    createProof: generateERC721,
    ledger: env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS,
    mint: createERC721Badge,
    network: Network.Goerli,
  },
  Email: {
    badgeType: BadgeSourceType.Email,
    createProof: generateEmail,
    ledger: env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
    mint: createEmailBadge,
    network: Network.Goerli,
  },
}
