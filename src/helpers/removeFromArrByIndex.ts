export default function removeFromArrByIndex(arr: string[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}
