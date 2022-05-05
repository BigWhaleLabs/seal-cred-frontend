export default function truncateMiddle(str: string): string {
  return `${str.slice(0, 11)}...${str.slice(-4, str.length)}`
}
