import { EmailFromList, inputFileName } from 'stores/EmailFormStore'
import ListedValue from 'components/ui/ListedValue'
import classnames, { display, flexWrap, gap } from 'classnames/tailwind'
import getFilesWithAmount from 'helpers/getFilesWithAmount'

const wrapper = classnames(
  display('flex'),
  flexWrap('flex-wrap'),
  gap('gap-1.5')
)

export default function ({
  emailList,
  removeValueFromList,
}: {
  removeValueFromList: (fileName: string) => void
  emailList: EmailFromList[]
}) {
  const filesWithAmount = getFilesWithAmount(emailList)

  return (
    <div className={wrapper}>
      {filesWithAmount.map(({ amount, fileName }) => {
        if (fileName === inputFileName) return null

        const amountMessage = amount > 1 ? ` (${amount} emails)` : ' (1 email)'

        return (
          <ListedValue
            emailsAmount={amountMessage}
            fileName={fileName}
            removeValueFromList={() => removeValueFromList(fileName)}
            title={fileName}
          />
        )
      })}
    </div>
  )
}
