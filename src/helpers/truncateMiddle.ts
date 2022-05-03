export default function truncateMiddle(str: string): string {
  return `${str.slice(0, 13)}...${str.slice(-4, str.length)}`
}
