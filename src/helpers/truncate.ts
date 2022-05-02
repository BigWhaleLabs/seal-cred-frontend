export default function truncate(str: string): string {
  return `${str.slice(0, 15)}...${str.slice(-4, str.length)}`
}
