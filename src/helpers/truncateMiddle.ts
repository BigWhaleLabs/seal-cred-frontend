export function truncateMiddle(str: string, from = 11, to?: number): string {
  return `${str.slice(0, from)}...${to ? str.slice(to, str.length) : ''}`
}

export function truncateIfNeeded(str: string, maxLength: number): string {
  console.log(str, str.length, maxLength)
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str
}
