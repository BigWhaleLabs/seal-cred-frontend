import { utils } from 'ethers'
import ProofResult from 'models/ProofResult'
import PublicKey from 'models/PublicKey'
import generateR2AndS2 from 'helpers/proofs/generateR2AndS2'
import unpackSignature from 'helpers/proofs/unpackSignature'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

function padZeroesOnRightUint8(array: Uint8Array, length: number) {
  const padding = new Uint8Array(length - array.length)
  return utils.concat([array, padding])
}

async function generateInput(
  domain: string,
  signature: string,
  eddsaPublicKey: PublicKey
) {
  const maxDomainLength = 90
  const messageUInt8 = padZeroesOnRightUint8(
    utils.toUtf8Bytes(domain),
    maxDomainLength
  )
  const { r2, s2 } = generateR2AndS2()
  return {
    message: Array.from(messageUInt8),
    pubKeyX: eddsaPublicKey.x,
    pubKeyY: eddsaPublicKey.y,
    ...(await unpackSignature(messageUInt8, signature)),
    r2,
    s2,
  }
}

export default async function build(
  domain: string,
  signature: string,
  eddsaPublicKey: PublicKey
): Promise<ProofResult> {
  return snarkjs.groth16.fullProve(
    await generateInput(domain, signature, eddsaPublicKey),
    'zk/EmailOwnershipChecker.wasm',
    'zk/EmailOwnershipChecker_final.zkey'
  )
}
