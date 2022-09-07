export default function () {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.txt,.csv'
  input.multiple = false

  input.onchange = ({ target }) => {
    const inputTarget = target as HTMLInputElement
    if (!inputTarget) return
    const files = inputTarget.files
    if (!files) return

    const reader = new FileReader()
    reader.readAsText(files[0])

    reader.onload = (readerEvent) => {
      if (!readerEvent.target) return

      const content = readerEvent.target.result
      console.log(content)
    }
  }

  input.click()
}
