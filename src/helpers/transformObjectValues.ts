export default function <V, T>(
  obj: { [key: string]: V },
  transformer: (value: V) => T
) {
  return Object.entries(obj).reduce(
    (result, [key, value]) => ({
      ...result,
      [key]: transformer(value),
    }),
    {}
  )
}
