import { utils } from 'ethers'
import BaseProof from 'helpers/BaseProof'
import Proof from 'models/Proof'
import ProofResult from 'models/ProofResult'
import PublicKey from 'models/PublicKey'
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
    signature: string,
    eddsaPublicKey: PublicKey
  ) {
    const maxDomainLength = 90
    const messageUInt8 = this.padZeroesOnRightUint8(
      utils.toUtf8Bytes(domain),
      maxDomainLength
    )
    const [r2, s2] = crypto.getRandomValues(new BigUint64Array(2))
    return {
      message: Array.from(messageUInt8),
      pubKeyX: eddsaPublicKey.x,
      pubKeyY: eddsaPublicKey.y,
      ...(await unpackSignature(messageUInt8, signature)),
      r2,
      s2,
    }
  }

  async build(signature: string, eddsaPublicKey: PublicKey) {
    this.result = await snarkjs.groth16.fullProve(
      await this.generateInput(this.domain, signature, eddsaPublicKey),
      'zk/EmailOwnershipChecker.wasm',
      'zk/EmailOwnershipChecker_final.zkey'
    )
  }
}
