export default interface Option<T> {
  label: string
  value: T
  disabled: boolean | undefined
}
