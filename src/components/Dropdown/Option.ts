export default interface Option {
  label: string
  onSelect?: () => void
  disabled?: boolean
}
