import { AccentText } from 'components/ui/Text'
import { textAlign } from 'classnames/tailwind'
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
  placeholder = 'Enter...',
  submitType = 'primary',
}: {
  loading?: boolean
  submitType?: 'primary' | 'secondary' | 'tertiary'
  onSubmit: (emails: string[]) => void
  placeholder?: string
}) {
  const { emailList, hasDifferentDomains, inputEmail } = useSnapshot(
    EmailFormStore,
    { sync: true }
  )

  const rawEmails = Object.values(emailList).map(({ email }) => email)
  const emailsAmount = emailList.length
  const listIsValid = emailsAmount > 9

  const submitText = `Submit ${emailsAmount} emails`

  return (
    <>
      <Input
        leftIcon={<Email />}
        placeholder={emailsAmount ? `${emailsAmount} / 10+` : placeholder}
        value={inputEmail}
        valueList={EmailFormStore.emailList}
        removeValueFromList={(fileName, index) =>
          EmailFormStore.removeEmailsFromList(fileName, index)
        }
        onChange={({ target }) =>
          EmailFormStore.safeInputChecker((target as HTMLInputElement).value)
        }
        onKeyDown={({ code }) => {
          if (code === 'Backspace') EmailFormStore.removeLastEmail()
          if (code === 'Enter' && listIsValid) onSubmit(rawEmails)
        }}
      />

      <LoadedFilesList
        emailList={EmailFormStore.emailList}
        removeValueFromList={(fileName) =>
          EmailFormStore.removeEmailsFromList(fileName)
        }
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
          center
          fullWidth
          loadingOverflow
          disabled={!listIsValid}
          loading={loading}
          type={submitType}
          onClick={() => onSubmit(rawEmails)}
        >
          {submitText}
        </Button>
      ) : (
        <GradientBorder disabled={loading || !listIsValid}>
          <Button
            center
            fullWidth
            gradientFont
            loadingOverflow
            small
            disabled={!listIsValid}
            loading={loading}
            type={submitType}
            onClick={() => onSubmit(rawEmails)}
          >
            {submitText}
          </Button>
        </GradientBorder>
      )}
    </>
  )
}
