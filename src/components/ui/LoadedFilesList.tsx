import { EmailFromList, inputFileName } from 'stores/EmailFormStore'
import ListedValue from 'components/ui/ListedValue'
import classnames, { display, flexWrap, gap } from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  flexWrap('flex-wrap'),
  gap('gap-1.5')
)

export default function ({
  removeValueFromList,
  emailList,
}: {
  removeValueFromList: (fileName: string) => void
  emailList: EmailFromList[]
}) {
  const files = emailList.map(({ fileName }) => fileName)
  const uniqueFiles = [...new Set(files)]
  const filesWithAmount = uniqueFiles.map((file) => ({
    fileName: file,
    amount: emailList.filter(({ fileName }) => file === fileName).length,
  }))

  return (
    <div className={wrapper}>
      {filesWithAmount.map(({ fileName, amount }) => {
        if (fileName === inputFileName) return null

        const amountMessage = amount > 1 ? ` (${amount} emails)` : ' (1 email)'

        return (
          <ListedValue
            title={fileName}
            emailsAmount={amountMessage}
            fileName={fileName}
            removeValueFromList={() => removeValueFromList(fileName)}
          />
        )
      })}
    </div>
  )
}
