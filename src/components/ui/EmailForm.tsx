import { useSnapshot } from 'valtio'
import { width } from 'classnames/tailwind'
import Button from 'components/ui/Button'
import Email from 'icons/Email'
import EmailFormStore from 'stores/EmailFormStore'
import GradientBorder from 'components/ui/GradientBorder'
import Input from 'components/ui/Input'

export default function ({
  loading,
  onSubmit,
  submitType = 'primary',
  placeholder = 'Enter...',
  submitText = 'Submit',
}: {
  loading?: boolean
  submitType?: 'primary' | 'secondary' | 'tertiary'
  onSubmit: (email: string) => void
  submitText?: string
  placeholder?: string
}) {
  const { inputEmail, emailList } = useSnapshot(EmailFormStore)
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
          emailList.length ? `${emailList.length + 1} / 10+` : placeholder
        }
        value={inputEmail}
        valueList={emailList}
        removeValueFromList={(index) =>
          EmailFormStore.removeFromListByIndex(index)
        }
        onChange={(e) =>
          EmailFormStore.safeInputChecker((e.target as HTMLInputElement).value)
        }
        onKeyDown={(event) => {
          if (emailList && !inputEmail && event.code === 'Backspace')
            EmailFormStore.removeFromListByIndex(emailList.length - 1)

          if (event.code === 'Enter' && listIsValid) onSubmit(inputEmail)
        }}
      />
      {submitType === 'primary' ? (
        <Button
          loading={loading}
          loadingOverflow
          fullWidth
          center
          type={submitType}
          disabled={!listIsValid}
          onClick={() => onSubmit(inputEmail)}
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
            onClick={() => onSubmit(inputEmail)}
          >
            {submitText}
          </Button>
        </GradientBorder>
      )}
    </>
  )
}
