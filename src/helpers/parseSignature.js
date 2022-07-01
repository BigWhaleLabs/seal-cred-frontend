import { ethers } from 'ethers'

const fromHexString = (hexString) =>
  new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)))

const hexStringTobigInt = (hexString) => {
  return Uint8Array_to_bigint(fromHexString(hexString))
}

// bigendian
function Uint8Array_to_bigint(x) {
  let ret = 0n
  for (let idx = 0; idx < x.length; idx++) {
    ret = ret * 256n
    ret = ret + BigInt(x[idx])
  }
  return ret
}

function bigint_to_array(n, k, x) {
  let mod = 1n
  for (let idx = 0; idx < n; idx++) {
    mod = mod * 2n
  }

  let ret = []
  let x_temp = x
  for (let idx = 0; idx < k; idx++) {
    ret.push(x_temp % mod)
    x_temp = x_temp / mod
  }
  return ret
}

function parseSignature(sig) {
  const r_hex = sig.slice(2, 66)
  const s_hex = sig.slice(66, 66 + 64)
  const r_bigint = hexStringTobigInt(r_hex)
  const s_bigint = hexStringTobigInt(s_hex)
  const r_array = bigint_to_array(86, 3, r_bigint)
  const s_array = bigint_to_array(86, 3, s_bigint)
  return [r_array, s_array]
}

export default parseSignature
