export default function (address: string, shortenBy = 4) {
  return `...${address.slice(-shortenBy)}`
}
