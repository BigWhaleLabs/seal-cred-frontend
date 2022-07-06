import { SealCredERC721Ledger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { Web3Provider } from '@ethersproject/providers'
import BaseBadgeBuilder from 'helpers/BaseBadgeBuilder'
import ERC721Proof from 'helpers/ERC721Proof'
import env from 'helpers/env'

export default class ERC721BadgeBuilder extends BaseBadgeBuilder {
  constructor(provider: Web3Provider) {
    super(provider, env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS)
  }

  createLedger(provider: Web3Provider, address: string) {
    return SealCredERC721Ledger__factory.connect(address, provider.getSigner(0))
  }

  create(proof: ERC721Proof) {
    return this.mint(proof.contract, proof.result)
  }
}
