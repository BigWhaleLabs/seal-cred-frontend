import { utils } from 'ethers'
import BaseProof from 'helpers/BaseProof'
import Network from 'models/Network'
import Proof from 'models/Proof'
import ProofResult from 'models/ProofResult'
import unpackSignature from 'helpers/unpackSignature'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

export interface ERC721ProofSchema extends Proof {
  contract: string
  account: string
  network: Network
}

export default class ERC721Proof
  extends BaseProof
  implements ERC721ProofSchema
{
  contract: string
  account: string
  network: Network

  get key() {
    return this.contract
  }

  static get type() {
    return 'ERC721'
  }

  equal(proof: BaseProof): boolean {
    return (
      proof instanceof ERC721Proof &&
      this.contract === proof.contract &&
      this.account === proof.account &&
      this.network === proof.network
    )
  }

  static fromJSON({
    contract,
    account,
    network,
    result,
  }: {
    contract: string
    account: string
    network: Network
    result?: ProofResult
  }) {
    const proof = new ERC721Proof(contract, account, network)
    proof.result = result
    return proof
  }

  toJSON() {
    return {
      type: ERC721Proof.type,
      contract: this.contract,
      account: this.account,
      network: this.network,
      result: this.result,
    }
  }

  constructor(contract: string, account: string, network: Network) {
    super()
    this.contract = contract
    this.account = account
    this.network = network
  }

  async generateInput(
    message: string,
    contract: string,
    signature: string,
    pubKeyX: string,
    pubKeyY: string
  ) {
    const messageUInt8 = utils.toUtf8Bytes(message)
    const privateInput = await unpackSignature(messageUInt8, signature)
    return {
      message: Array.from(messageUInt8),
      tokenAddress: Array.from(utils.toUtf8Bytes(contract.toLowerCase())),
      pubKeyX,
      pubKeyY,
      ...privateInput,
    }
  }

  async build(
    message: string,
    signature: string,
    pubKeyX: string,
    pubKeyY: string
  ) {
    this.result = await snarkjs.groth16.fullProve(
      await this.generateInput(
        message,
        this.contract,
        signature,
        pubKeyX,
        pubKeyY
      ),
      'zk/ERC721OwnershipChecker.wasm',
      'zk/ERC721OwnershipChecker_final.zkey'
    )
  }
}
