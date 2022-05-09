export default function findByValue<K, V>(map: Map<K, V>, searchValue: V) {
  const results: K[] = []
  for (const [key, value] of map.entries()) {
    if (value === searchValue) results.push(key)
  }
  return results
}
