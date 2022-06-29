import { utils } from 'ethers'
import BaseProof from 'helpers/BaseProof'
import Proof from 'models/Proof'
import ProofResult from 'models/ProofResult'
import unpackSignature from 'helpers/unpackSignature'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

export interface EmailProofSchema extends Proof {
  domain: string
}

export default class EmailProof extends BaseProof implements EmailProofSchema {
  domain: string

  get key() {
    return this.domain
  }

  static get type() {
    return 'email'
  }

  equal(proof: BaseProof): boolean {
    return proof instanceof EmailProof && this.domain === proof.domain
  }

  static fromJSON({
    domain,
    result,
  }: {
    domain: string
    result?: ProofResult
  }) {
    const proof = new EmailProof(domain)
    proof.result = result
    return proof
  }

  toJSON() {
    return {
      type: EmailProof.type,
      domain: this.domain,
      result: this.result,
    }
  }

  constructor(domain: string) {
    super()
    this.domain = domain
  }

  padZeroesOnRightUint8(array: Uint8Array, length: number) {
    const padding = new Uint8Array(length - array.length)
    return utils.concat([array, padding])
  }

  async generateInput(
    domain: string,
    nullifier: string,
    signature: string,
    pubKeyX: string,
    pubKeyY: string
  ) {
    const maxDomainLength = 90
    const domainBytes = this.padZeroesOnRightUint8(
      utils.toUtf8Bytes(domain),
      maxDomainLength
    )

    // Get the message in bytes and its hash
    const messageUInt8 = utils.concat([
      domainBytes,
      utils.toUtf8Bytes(nullifier),
    ])

    // Generate input
    const privateInput = await unpackSignature(messageUInt8, signature)
    return {
      message: Array.from(messageUInt8),
      domain: Array.from(domainBytes),
      pubKeyX,
      pubKeyY,
      ...privateInput,
    }
  }

  async build(
    nullifier: string,
    signature: string,
    pubKeyX: string,
    pubKeyY: string
  ) {
    this.result = await snarkjs.groth16.fullProve(
      await this.generateInput(
        this.domain,
        nullifier,
        signature,
        pubKeyX,
        pubKeyY
      ),
      'zk/EmailOwnershipChecker.wasm',
      'zk/EmailOwnershipChecker_final.zkey'
    )
  }
}
