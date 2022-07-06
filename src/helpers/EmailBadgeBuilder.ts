import { SealCredEmailLedger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { Web3Provider } from '@ethersproject/providers'
import BaseBadgeBuilder from 'helpers/BaseBadgeBuilder'
import EmailProof from 'helpers/EmailProof'
import env from 'helpers/env'

export default class EmailBadgeBuilder extends BaseBadgeBuilder {
  constructor(provider: Web3Provider) {
    super(provider, env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS)
  }

  createLedger(provider: Web3Provider, address: string) {
    return SealCredEmailLedger__factory.connect(address, provider.getSigner(0))
  }

  create(proof: EmailProof) {
    return this.mint(proof.domain, proof.result)
  }
}
