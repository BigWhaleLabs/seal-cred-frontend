import { AccentText } from 'components/ui/Text'
import { useSnapshot } from 'valtio'
import { width } from 'classnames/tailwind'
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
  submitText = 'Submit',
}: {
  loading?: boolean
  submitType?: 'primary' | 'secondary' | 'tertiary'
  submitText?: string
  onSubmit: (emails: readonly string[]) => void
  placeholder?: string
}) {
  const { inputEmail, emailMapping, hasDifferentDomains } =
    useSnapshot(EmailFormStore)
  const emailList = Object.values(emailMapping)
    .flat()
    .map(({ email }) => email)
  const listIsValid = emailList.length > 9

  return (
    <>
      <Input
        leftIcon={
          <div className={width('w-3.5')}>
            <Email />
          </div>
        }
        placeholder={
          emailList.length ? `${emailList.length} / 10+` : placeholder
        }
        value={inputEmail}
        valueList={EmailFormStore.emailMapping}
        removeValueFromList={(fileName, index) =>
          EmailFormStore.removeEmailsFromList(fileName, index)
        }
        onChange={(e) =>
          EmailFormStore.safeInputChecker((e.target as HTMLInputElement).value)
        }
        onKeyDown={(event) => {
          if (event.code === 'Enter' && listIsValid) onSubmit(emailList)
        }}
      />
      {Object.keys(emailMapping).map((fileName) => (
        <LoadedFilesList
          fileName={fileName}
          removeValueFromList={(fileName, index) =>
            EmailFormStore.removeEmailsFromList(fileName, index)
          }
        />
      ))}
      {hasDifferentDomains && (
        <AccentText color="text-secondary">
          Not all of the email domains match. Are you sure you want to submit
          this email list?
        </AccentText>
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
