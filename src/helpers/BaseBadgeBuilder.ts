import { BigNumber, BigNumberish, ContractTransaction, Overrides } from 'ethers'
import { PromiseOrValue } from '@big-whale-labs/seal-cred-ledger-contract/dist/typechain/common'
import { Web3Provider } from '@ethersproject/providers'
import ProofResult from 'models/ProofResult'

interface SimpleLedger {
  mint(
    originalContract: PromiseOrValue<string>,
    a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    b: [
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
    ],
    c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    input: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & {
      from?: PromiseOrValue<string>
    }
  ): Promise<ContractTransaction>
}

export default abstract class BaseBadgeBuilder {
  ledger: SimpleLedger

  constructor(provider: Web3Provider, address: string) {
    this.ledger = this.createLedger(provider, address)
  }

  abstract createLedger(provider: Web3Provider, address: string): SimpleLedger

  async mint(message: string, proofResult?: ProofResult) {
    if (!proofResult) throw new Error('Invalid proof')

    // This is a hacky way to get rid of the third arguments that are unnecessary and convert to BigNumber
    // Also pay attention to array indexes
    const tx = await this.ledger.mint(
      message,
      [
        BigNumber.from(proofResult.proof.pi_a[0]),
        BigNumber.from(proofResult.proof.pi_a[1]),
      ],
      [
        [
          BigNumber.from(proofResult.proof.pi_b[0][1]),
          BigNumber.from(proofResult.proof.pi_b[0][0]),
        ],
        [
          BigNumber.from(proofResult.proof.pi_b[1][1]),
          BigNumber.from(proofResult.proof.pi_b[1][0]),
        ],
      ],
      [
        BigNumber.from(proofResult.proof.pi_c[0]),
        BigNumber.from(proofResult.proof.pi_c[1]),
      ],
      proofResult.publicSignals.map(BigNumber.from)
    )
    return tx.wait()
  }
}
