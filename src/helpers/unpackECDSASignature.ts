import { utils } from 'ethers'

export default function (signature: string) {
  const { r: r2, s: s2 } = utils.splitSignature(signature)
  return { r2, s2 }
}
