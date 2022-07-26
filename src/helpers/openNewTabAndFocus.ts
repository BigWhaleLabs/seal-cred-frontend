export default function (url: string) {
  return window.open(url, '_blank')?.focus()
}
