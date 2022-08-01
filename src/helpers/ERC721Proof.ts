import { utils } from 'ethers'
import BalanceSignature from 'models/BalanceSignature'
import BaseProof from 'helpers/BaseProof'
import Network from 'models/Network'
import Proof from 'models/Proof'
import ProofResult from 'models/ProofResult'
import PublicKey from 'models/PublicKey'
import Signature from 'models/Signature'
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

  async inputsForSignature(
    publicKey: PublicKey,
    signature: Signature | BalanceSignature,
    suffix: 'Token' | 'Address',
    threshold?: number
  ) {
    const messageUInt8 = utils.toUtf8Bytes(signature.message)
    const messageBytes =
      'balance' in signature
        ? [...messageUInt8, signature.balance]
        : messageUInt8
    const { R8x, R8y, S, M } = await unpackSignature(
      messageBytes,
      signature.signature
    )
    return {
      [`message${suffix}`]: Array.from(messageUInt8),
      [`pubKeyX${suffix}`]: publicKey.x,
      [`pubKeyY${suffix}`]: publicKey.y,
      [`R8x${suffix}`]: R8x,
      [`R8y${suffix}`]: R8y,
      [`S${suffix}`]: S,
      [`M${suffix}`]: M,
      balance: 'balance' in signature ? signature.balance : undefined,
      threshold,
    }
  }

  async generateInputs(
    ownershipSignature: Signature,
    balanceSignature: BalanceSignature,
    eddsaPublicKey: PublicKey
  ) {
    const [r2, s2] = crypto.getRandomValues(new BigUint64Array(2))
    const addressInputs = await this.inputsForSignature(
      eddsaPublicKey,
      ownershipSignature,
      'Address'
    )
    return {
      ...addressInputs,
      ...(await this.inputsForSignature(
        eddsaPublicKey,
        balanceSignature,
        'Token',
        1
      )),
      r2,
      s2,
    }
  }

  async build(
    ownershipSignature: Signature,
    balanceSignature: BalanceSignature,
    eddsaPublicKey: PublicKey
  ) {
    const inputs = await this.generateInputs(
      ownershipSignature,
      balanceSignature,
      eddsaPublicKey
    )
    this.result = await snarkjs.groth16.fullProve(
      inputs,
      'zk/BalanceChecker.wasm',
      'zk/BalanceChecker_final.zkey'
    )
  }
}
