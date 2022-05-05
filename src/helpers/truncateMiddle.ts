export default function truncateMiddle(
  str: string,
  from = 11,
  to = -4
): string {
  return `${str.slice(0, from)}...${str.slice(to, str.length)}`
}
