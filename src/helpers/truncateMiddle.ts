export default function truncateMiddle(
  str: string,
  from = 11,
  to?: number
): string {
  return `${str.slice(0, from)}...${to ? str.slice(to, str.length) : ''}`
}
