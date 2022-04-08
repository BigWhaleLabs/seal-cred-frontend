/* eslint-disable @typescript-eslint/no-unused-vars */

export default function unstringifyBigInts(o) {
  if (typeof o == 'string' && /^[0-9]+$/.test(o)) {
    return BigInt(o)
  } else if (typeof o == 'string' && /^0x[0-9a-fA-F]+$/.test(o)) {
    return BigInt(o)
  } else if (Array.isArray(o)) {
    return o.map(unstringifyBigInts)
  } else if (typeof o == 'object') {
    const res = {}
    const keys = Object.keys(o)
    keys.forEach((k) => {
      res[k] = unstringifyBigInts(o[k])
    })
    return res
  } else {
    return o
  }
}
