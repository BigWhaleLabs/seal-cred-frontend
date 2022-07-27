export default function (link: string) {
  const newWindow = window.open(link, '_blank')
  if (newWindow) {
    newWindow.focus()
    newWindow.opener = null
  }
}
