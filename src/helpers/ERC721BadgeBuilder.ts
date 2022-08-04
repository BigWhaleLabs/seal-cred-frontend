import { RelayProvider } from '@opengsn/provider'
import { SCERC721Ledger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { Web3Provider } from '@ethersproject/providers'
import BaseBadgeBuilder from 'helpers/BaseBadgeBuilder'
import ERC721Proof from 'helpers/ERC721Proof'
import env from 'helpers/env'

export default class ERC721BadgeBuilder extends BaseBadgeBuilder {
  constructor(provider: RelayProvider) {
    super(provider, env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS)
  }

  createLedger(provider: RelayProvider, address: string) {
    return SCERC721Ledger__factory.connect(address, provider.getSigner(0))
  }

  create(proof: ERC721Proof) {
    return this.mint(proof.result)
  }
}
