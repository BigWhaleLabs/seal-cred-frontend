import { utils } from 'ethers'
import BalanceSignature from 'models/BalanceSignature'
import ProofResult from 'models/ProofResult'
import PublicKey from 'models/PublicKey'
import Signature from 'models/Signature'
import generateR2AndS2 from 'helpers/proofs/generateR2AndS2'
import unpackSignature from 'helpers/proofs/unpackSignature'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

async function inputsForSignature(
  publicKey: PublicKey,
  signature: Signature | BalanceSignature,
  suffix: 'Token' | 'Address',
  threshold?: number
) {
  const messageUInt8 = utils.toUtf8Bytes(signature.message)
  const messageBytes =
    'balance' in signature ? [...messageUInt8, signature.balance] : messageUInt8
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

async function generateInputs(
  ownershipSignature: Signature,
  balanceSignature: BalanceSignature,
  eddsaPublicKey: PublicKey
) {
  const { r2, s2 } = generateR2AndS2()
  const addressInputs = await inputsForSignature(
    eddsaPublicKey,
    ownershipSignature,
    'Address'
  )
  return {
    ...addressInputs,
    ...(await inputsForSignature(eddsaPublicKey, balanceSignature, 'Token', 1)),
    r2,
    s2,
  }
}

export default async function build(
  ownershipSignature: Signature,
  balanceSignature: BalanceSignature,
  eddsaPublicKey: PublicKey
): Promise<ProofResult> {
  const inputs = await generateInputs(
    ownershipSignature,
    balanceSignature,
    eddsaPublicKey
  )

  return snarkjs.groth16.fullProve(
    inputs,
    'zk/BalanceChecker.wasm',
    'zk/BalanceChecker_final.zkey'
  )
}
