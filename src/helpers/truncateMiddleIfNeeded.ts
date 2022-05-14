export default function (str: string, maxLength: number) {
  return str.length > maxLength && maxLength > 4
    ? `${str.slice(
        0,
        maxLength / 2 - (maxLength % 2 === 1 ? 1 : 2)
      )}...${str.slice(-(maxLength / 2 - 1))}`
    : str
}
