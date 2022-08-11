import { BalanceProofStruct } from '@big-whale-labs/seal-cred-ledger-contract/dist/typechain/contracts/ExternalSCERC721Ledger'
import { BigNumber } from 'ethers'
import ProofResult from 'models/ProofResult'

export default function makeTransaction(proofResult: ProofResult) {
  // This is a hacky way to get rid of the third arguments that are unnecessary and convert to BigNumber
  // Also pay attention to array indexes
  return {
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
  } as BalanceProofStruct
}
