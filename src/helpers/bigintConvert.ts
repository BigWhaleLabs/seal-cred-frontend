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
