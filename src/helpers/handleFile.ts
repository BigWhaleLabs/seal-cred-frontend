export default function (
  callback: (stringList: string, fileName: string) => void
) {
  const input = document.createElement('input')
  input.type = 'file'

  input.onchange = ({ target }) => {
    const inputTarget = target as HTMLInputElement
    if (!inputTarget) return
    const file = inputTarget.files && inputTarget.files[0]
    if (!file) return
    const fileName = file.name

    const reader = new FileReader()
    reader.readAsText(file)

    reader.onload = ({ target }) => {
      if (!target || !target.result) return

      callback(target.result as string, fileName)
    }
  }

  input.click()
}
