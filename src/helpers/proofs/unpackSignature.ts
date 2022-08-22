import { Scalar } from 'ffjavascript'
import { utils } from 'ethers'
import buildBabyJub, { BabyJub } from 'circomlibjs/babyjub'
import buildMimc7 from 'circomlibjs/mimc7'

let babyJub: BabyJub

export default async function (
  messageUInt8: Uint8Array | (number | string)[],
  packedSignature: string
) {
  const mimc7 = await buildMimc7()
  const M = mimc7.multiHash(messageUInt8)

  // Create BabyJub
  if (!babyJub) {
    babyJub = await buildBabyJub()
  }
  const F = babyJub.F

  // Unpack signature
  const signatureBuffer = utils.arrayify(packedSignature)
  const signature = {
    R8: babyJub.unpackPoint(signatureBuffer.slice(0, 32)),
    S: Scalar.fromRprLE(signatureBuffer, 32, 32),
  }
  if (!signature.R8) throw new Error('Unable to unpack the signature')

  return {
    R8x: F.toObject(signature.R8[0]).toString(),
    R8y: F.toObject(signature.R8[1]).toString(),
    S: signature.S.toString(),
    M: F.toObject(M).toString(),
  }
}
