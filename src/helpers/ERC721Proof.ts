import { utils } from 'ethers'
import Proof from 'models/Proof'
import ProofResult from 'models/ProofResult'
import unpackSignature from 'helpers/unpackSignature'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

export default class ERC721Proof implements Proof {
  result?: ProofResult
  contract: string
  account: string

  get key() {
    return this.contract
  }

  static get type() {
    return 'erc721'
  }

  static fromJSON({
    contract,
    account,
    result,
  }: {
    contract: string
    account: string
    result?: ProofResult
  }) {
    const proof = new ERC721Proof(contract, account)
    proof.result = result
    return proof
  }

  toJSON() {
    return {
      type: ERC721Proof.type,
      contract: this.contract,
      account: this.account,
      result: this.result,
    }
  }

  constructor(contract: string, account: string) {
    this.contract = contract
    this.account = account
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
