import { Point, sign } from '@noble/secp256k1'
import {
  Uint8ArrayToBigint,
  bigintToArray,
  bigintToTuple,
  bigintToUint8Array,
} from 'helpers/bigintConvert'
import { keccak256 } from 'keccak256'
import EcdsaInput from 'models/EcdsaInput'
import EthStore from 'stores/EthStore'

export default async function createEcdsaInput() {
  const tokenId = await EthStore.getTokenId()
  const addresses = await EthStore.getAddresses()
  if (!addresses || !tokenId) return

  const proverPrivkey = BigInt(addresses[tokenId])

  const proverPubkey = Point.fromPrivateKey(proverPrivkey)
  const msg = 'zk-airdrop'
  const msghash_bigint = Uint8ArrayToBigint(keccak256(msg))
  const msghash = bigintToUint8Array(msghash_bigint)
  const sig = await sign(msghash, bigintToUint8Array(proverPrivkey), {
    canonical: true,
    der: false,
  })
  const r = sig.slice(0, 32)
  const s = sig.slice(32, 64)
  const r_bigint = Uint8ArrayToBigint(r)
  const s_bigint = Uint8ArrayToBigint(s)
  const r_array = bigintToArray(86, 3, r_bigint)
  const s_array = bigintToArray(86, 3, s_bigint)
  const msghash_array = bigintToArray(86, 3, msghash_bigint)

  const ecdsaInput: EcdsaInput = {
    r: r_array.map((x) => x.toString()),
    s: s_array.map((x) => x.toString()),
    msghash: msghash_array.map((x) => x.toString()),
    pubkey: [
      bigintToTuple(proverPubkey.x).map((x) => x.toString()),
      bigintToTuple(proverPubkey.y).map((x) => x.toString()),
    ],
  }

  return ecdsaInput
}
