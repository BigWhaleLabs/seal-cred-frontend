export default function (str: string, maxLength: number) {
  const isOddNum = maxLength % 2 === 1 ? 1 : 2
  const halfLength = maxLength / 2
  return str.length > maxLength && maxLength > 4
    ? `${str.slice(0, halfLength - isOddNum)}...${str.slice(-(halfLength - 1))}`
    : str
}
