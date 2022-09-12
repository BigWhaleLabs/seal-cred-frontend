import { utils } from 'ethers'
import ProofResult from 'models/ProofResult'
import PublicKey from 'models/PublicKey'
import Signature from 'models/Signature'
import generateR2AndS2 from 'helpers/proofs/generateR2AndS2'
import unpackSignature from 'helpers/proofs/unpackSignature'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

async function inputsForMessage(
  publicKey: PublicKey,
  signature: Signature,
  suffix: 'Address' | 'Farcaster'
) {
  const messageBytes = utils.toUtf8Bytes(signature.message)
  const { R8x, R8y, S, M } = await unpackSignature(
    messageBytes,
    signature.signature
  )

  return {
    [`message${suffix}`]: Array.from(messageBytes),
    [`pubKeyX${suffix}`]: publicKey.x,
    [`pubKeyY${suffix}`]: publicKey.y,
    [`R8x${suffix}`]: R8x,
    [`R8y${suffix}`]: R8y,
    [`S${suffix}`]: S,
    [`M${suffix}`]: M,
  }
}

async function generateInput(
  publicKey: PublicKey,
  addressSignature: Signature,
  farcaterSignature: Signature
) {
  const { r2, s2 } = generateR2AndS2()

  return {
    ...(await inputsForMessage(publicKey, addressSignature, 'Address')),
    ...(await inputsForMessage(publicKey, farcaterSignature, 'Farcaster')),
    r2,
    s2,
  }
}

export default async function build(
  publicKey: PublicKey,
  addressSignature: Signature,
  farcaterSignature: Signature
): Promise<ProofResult> {
  return snarkjs.groth16.fullProve(
    await generateInput(publicKey, addressSignature, farcaterSignature),
    'zk/FarcasterChecker.wasm',
    'zk/FarcasterChecker_final.zkey'
  )
}
