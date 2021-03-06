import { BalanceProofStruct } from '@big-whale-labs/seal-cred-ledger-contract/dist/typechain/contracts/ExternalSCERC721Ledger'
import { BigNumber, ContractTransaction, Overrides } from 'ethers'
import { ExternalSCERC721Ledger } from '@big-whale-labs/seal-cred-ledger-contract'
import { PromiseOrValue } from '@big-whale-labs/seal-cred-ledger-contract/dist/typechain/common'
import { Web3Provider } from '@ethersproject/providers'
import ProofResult from 'models/ProofResult'

interface SimpleLedger {
  mint(
    proof: unknown,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>
    }
  ): Promise<ContractTransaction>
}

export default abstract class BaseBadgeBuilder {
  ledger: SimpleLedger | ExternalSCERC721Ledger

  constructor(provider: Web3Provider, address: string) {
    this.ledger = this.createLedger(provider, address)
  }

  abstract createLedger(
    provider: Web3Provider,
    address: string
  ): SimpleLedger | ExternalSCERC721Ledger

  async mint(proofResult?: ProofResult, message?: string, signature?: string) {
    if (!proofResult) throw new Error('Invalid proof')

    // This is a hacky way to get rid of the third arguments that are unnecessary and convert to BigNumber
    // Also pay attention to array indexes
    const txData = {
      a: [
        BigNumber.from(proofResult.proof.pi_a[0]),
        BigNumber.from(proofResult.proof.pi_a[1]),
      ],
      b: [
        [
          BigNumber.from(proofResult.proof.pi_b[0][1]),
          BigNumber.from(proofResult.proof.pi_b[0][0]),
        ],
        [
          BigNumber.from(proofResult.proof.pi_b[1][1]),
          BigNumber.from(proofResult.proof.pi_b[1][0]),
        ],
      ],
      c: [
        BigNumber.from(proofResult.proof.pi_c[0]),
        BigNumber.from(proofResult.proof.pi_c[1]),
      ],
      input: proofResult.publicSignals.map(BigNumber.from),
    }
    const tx =
      'mint((uint256[2],uint256[2][2],uint256[2],uint256[46]),bytes,bytes)' in
      this.ledger
        ? await this.ledger[
            'mint((uint256[2],uint256[2][2],uint256[2],uint256[46]),bytes,bytes)'
          ](txData as BalanceProofStruct, message || '', signature || '')
        : await this.ledger.mint(txData)
    return tx.wait()
  }
}
