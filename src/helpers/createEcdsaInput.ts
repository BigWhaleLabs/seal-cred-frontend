import {
  bigintToArray,
  hexStringToBigInt,
  parsePubkey,
  parseSignature,
} from 'helpers/bigintConvert'
import { ethers } from 'ethers'
import EcdsaInput from 'models/EcdsaInput'
import PublicAccountStore from 'stores/PublicAccountStore'

export default function createEcdsaInput(signature: string) {
  const msg = PublicAccountStore.mainEthWallet.address
  const msgHash = ethers.utils.hashMessage(msg)
  const msghash_bigint = hexStringToBigInt(msgHash)
  const msghash_array = bigintToArray(86, 3, msghash_bigint)

  const proverPubkey = ethers.utils.recoverPublicKey(
    msgHash,
    ethers.utils.arrayify(signature)
  )
  const [r_array, s_array] = parseSignature(signature)
  const [pubkey_x, pubkey_y] = parsePubkey(proverPubkey)

  const ecdsaInput: EcdsaInput = {
    r: r_array.map((x) => x.toString()),
    s: s_array.map((x) => x.toString()),
    msghash: msghash_array.map((x) => x.toString()),
    pubkey: [
      pubkey_x.map((x) => x.toString()),
      pubkey_y.map((x) => x.toString()),
    ],
  }

  return ecdsaInput
}
