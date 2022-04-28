export default function shortenedAddress(address: string) {
  return `...${address.slice(-4)}`
}
