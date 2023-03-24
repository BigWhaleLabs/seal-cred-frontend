import { Entropy } from 'entropy-string'

export default function () {
  const hexadecimalCharset = '0123456789ABCDEF'
  const randomHexadecimalNumber1 = new Entropy({
    bits: 64,
    charset: hexadecimalCharset,
  }).string()
  const randomHexadecimalNumber2 = new Entropy({
    bits: 64,
    charset: hexadecimalCharset,
  }).string()
  const r2 = BigInt('0x' + randomHexadecimalNumber1).toString(10)
  const s2 = BigInt('0x' + randomHexadecimalNumber2).toString(10)

  return { r2, s2 }
}
