import { AccentText } from 'components/ui/Text'
import { textAlign, width } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import Button from 'components/ui/Button'
import Email from 'icons/Email'
import EmailFormStore from 'stores/EmailFormStore'
import GradientBorder from 'components/ui/GradientBorder'
import Input from 'components/ui/Input'
import LoadedFilesList from 'components/ui/LoadedFilesList'

export default function ({
  loading,
  onSubmit,
  submitType = 'primary',
  placeholder = 'Enter...',
}: {
  loading?: boolean
  submitType?: 'primary' | 'secondary' | 'tertiary'
  onSubmit: (emails: readonly string[]) => void
  placeholder?: string
}) {
  const { inputEmail, hasDifferentDomains, emailMapping } =
    useSnapshot(EmailFormStore)

  const emailList = Object.values(emailMapping)
    .flat()
    .map(({ email }) => email)
  const emailsAmount = emailList.length
  const listIsValid = emailsAmount > 9

  const submitText = `Submit ${listIsValid ? emailsAmount : ''} emails`

  return (
    <>
      <Input
        leftIcon={
          <div className={width('w-3.5')}>
            <Email />
          </div>
        }
        placeholder={emailsAmount ? `${emailsAmount} / 10+` : placeholder}
        value={inputEmail}
        valueList={EmailFormStore.emailMapping}
        removeValueFromList={(fileName, index) =>
          EmailFormStore.removeEmailsFromList(fileName, index)
        }
        onChange={({ target }) =>
          EmailFormStore.safeInputChecker((target as HTMLInputElement).value)
        }
        onKeyDown={({ code }) => {
          if (code === 'Enter' && listIsValid) onSubmit(emailList)
        }}
      />
      <LoadedFilesList
        removeValueFromList={(fileName) =>
          EmailFormStore.removeEmailsFromList(fileName)
        }
        emailMapping={EmailFormStore.emailMapping}
      />

      {hasDifferentDomains && (
        <div className={textAlign('text-center')}>
          <AccentText color="text-secondary">
            Not all of the email domains match. Are you sure you want to submit
            this email list?
          </AccentText>
        </div>
      )}

      {submitType === 'primary' ? (
        <Button
          loading={loading}
          loadingOverflow
          fullWidth
          center
          type={submitType}
          disabled={!listIsValid}
          onClick={() => onSubmit(emailList)}
        >
          {submitText}
        </Button>
      ) : (
        <GradientBorder>
          <Button
            gradientFont
            loading={loading}
            loadingOverflow
            fullWidth
            center
            small
            type={submitType}
            disabled={!listIsValid}
            onClick={() => onSubmit(emailList)}
          >
            {submitText}
          </Button>
        </GradientBorder>
      )}
    </>
  )
}
