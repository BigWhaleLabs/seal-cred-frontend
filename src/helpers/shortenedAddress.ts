export default function shortenedAddress(address: string, shortenBy = 4) {
  return `...${address.slice(-shortenBy)}`
}
