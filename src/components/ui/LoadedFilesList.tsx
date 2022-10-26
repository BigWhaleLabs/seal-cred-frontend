import { EmailMapping, inputFileName } from 'stores/EmailFormStore'
import ListedValue from 'components/ui/ListedValue'
import classnames, { display, flexWrap, gap } from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  flexWrap('flex-wrap'),
  gap('gap-1.5')
)

export default function ({
  removeValueFromList,
  emailMapping,
}: {
  removeValueFromList: (fileName: string) => void
  emailMapping: EmailMapping
}) {
  return (
    <div className={wrapper}>
      {Object.keys(emailMapping).map((fileName) => {
        if (fileName === inputFileName) return null

        const emailsAmount = emailMapping[fileName].length
        const amountMessage =
          emailsAmount > 1 ? ` (${emailsAmount} emails)` : ' (1 email)'

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
