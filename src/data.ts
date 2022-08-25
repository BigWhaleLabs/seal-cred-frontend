import { ProofStore } from 'stores/ProofStore'
import { Web3Provider } from '@ethersproject/providers'
import { requestContractMetadata } from 'helpers/proofs/attestor'
import EmailBadge from 'icons/EmailBadge'
import Erc721Badge from 'icons/Erc721Badge'
import Network from 'models/Network'
import Proof from 'models/Proof'
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
    ledger: env.VITE_SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS,
    title: 'Mainnet NFT derivatives',
    proofTitle: 'Mainnet NFTs',
    ownerTitle: 'This wallet owns a {derivative}',
    ownerContent:
      'This is a zkNFT derivative. It means this person has been verified to own at least one ‘{original}‘ Mainnet NFT.',
    proofIcon: Erc721Badge,
    badgeType: BadgeSourceType.ERC721,
    network: Network.Mainnet,
    mint: async (provider: Web3Provider, proof: Proof) => {
      const signature = await requestContractMetadata(
        Network.Mainnet,
        proof.origin
      )
      return createExternalERC721Badge(
        provider,
        proof,
        signature.message,
        signature.signature
      )
    },
    createProof: (store: ProofStore, original: string) =>
      generateERC721(store, original, Network.Mainnet),
  },
  Email: {
    ledger: env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
    title: 'Email derivatives',
    proofTitle: 'Goerli NFTs',
    ownerTitle: 'This wallet belongs to someone with {derivative}',
    ownerContent:
      'This is a zkNFT derivative of an email. It means this person has been verified own a ‘{original}‘ email.',
    proofIcon: EmailBadge,
    badgeType: BadgeSourceType.Email,
    network: Network.Goerli,
    mint: createEmailBadge,
    createProof: (
      store: ProofStore,
      original: string,
      options?: {
        secret: string
      }
    ) => {
      if (!options?.secret) return Promise.resolve()
      return generateEmail(store, original, options.secret)
    },
  },
  ERC721: {
    ledger: env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS,
    title: 'Goerli NFT derivatives',
    proofTitle: 'Additional proofs',
    ownerTitle: 'This wallet owns a {derivative}',
    ownerContent:
      'This is a zkNFT derivative. It means this person has been verified to own at least one ‘{original}‘ Goerli NFT.',
    proofIcon: Erc721Badge,
    badgeType: BadgeSourceType.ERC721,
    network: Network.Goerli,
    mint: createERC721Badge,
    createProof: (store: ProofStore, original: string) =>
      generateERC721(store, original, Network.Goerli),
  },
}
