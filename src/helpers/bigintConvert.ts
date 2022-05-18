export const hexStringToBigInt = (hexString: string) => {
  const hexStringUint = fromHexString(hexString)
  if (hexStringUint === undefined) return BigInt(0)
  return Uint8ArrayToBigint(hexStringUint)
}

export const fromHexString = (hexString: string) => {
  const hexStringPortion = hexString.match(/.{1,2}/g)
  if (hexStringPortion === null) return
  return new Uint8Array(hexStringPortion.map((byte) => parseInt(byte, 16)))
}

export const bigintToUint8Array = (x: bigint) => {
  const ret = new Uint8Array(32)
  for (let idx = 31; idx >= 0; idx--) {
    ret[idx] = Number(x % BigInt(256))
    x = x / BigInt(256)
  }
  return ret
}

export const bigintToTuple = (x: bigint) => {
  const mod = BigInt('77371252455336267181195264')
  const ret = [BigInt(0), BigInt(0), BigInt(0)]

  let tempX = x
  for (let idx = 0; idx < 3; idx++) {
    ret[idx] = tempX % mod
    tempX = tempX / mod
  }
  return ret
}

export const bigintToArray = (n: number, k: number, x: bigint) => {
  let mod = BigInt(1)
  for (let idx = 0; idx < n; idx++) {
    mod = mod * BigInt(2)
  }

  const ret = []
  let x_temp = x
  for (let idx = 0; idx < k; idx++) {
    ret.push(x_temp % mod)
    x_temp = x_temp / mod
  }
  return ret
}

export const Uint8ArrayToBigint = (x: Uint8Array) => {
  let ret = BigInt(0)
  for (let idx = 0; idx < x.length; idx++) {
    ret = ret * BigInt(256)
    ret = ret + BigInt(x[idx])
  }
  return ret
}

export function parseSignature(sig: string) {
  const r_hex = sig.slice(2, 66)
  const s_hex = sig.slice(66, 66 + 64)
  const r_bigint = hexStringToBigInt(r_hex)
  const s_bigint = hexStringToBigInt(s_hex)
  const r_array = bigintToArray(86, 3, r_bigint)
  const s_array = bigintToArray(86, 3, s_bigint)
  return [r_array, s_array]
}

export function parsePubkey(pk: string) {
  const sliced_pk = pk.slice(4)
  const pk_x_hex = sliced_pk.slice(0, 64)
  const pk_y_hex = sliced_pk.slice(64, 128)
  const pk_x_bigint = hexStringToBigInt(pk_x_hex)
  const pk_y_bigint = hexStringToBigInt(pk_y_hex)
  const pk_x_arr = bigintToArray(86, 3, pk_x_bigint)
  const pk_y_arr = bigintToArray(86, 3, pk_y_bigint)
  return [pk_x_arr, pk_y_arr]
}

export function bnToHex(stringNum: string) {
  let bn = BigInt(stringNum)

  let pos = true
  if (bn < 0) {
    pos = false
    bn = bitnot(bn)
  }

  let hex = bn.toString(16)
  if (hex.length % 2) {
    hex = '0' + hex
  }

  if (pos && 0x80 & parseInt(hex.slice(0, 2), 16)) {
    hex = '00' + hex
  }
  while (hex.length < 64) hex = '0' + hex

  return '0x' + hex
}

function bitnot(bigIntNum: bigint) {
  const bn = -bigIntNum
  let bin = bn.toString(2)
  let prefix = ''
  while (bin.length % 8) {
    bin = '0' + bin
  }
  if ('1' === bin[0] && -1 !== bin.slice(1).indexOf('1')) {
    prefix = '11111111'
  }
  bin = bin
    .split('')
    .map(function (i) {
      return '0' === i ? '1' : '0'
    })
    .join('')
  return BigInt('0b' + prefix + bin) + BigInt(1)
}
