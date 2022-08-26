import Button from 'components/Button'
import Email from 'icons/Email'
import GradientBorder from 'components/GradientBorder'
import Input from 'components/Input'
import useEmailForm from 'hooks/useEmailForm'

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
  const { email, setEmail, emailIsValid } = useEmailForm()

  return (
    <>
      <Input
        leftIcon={<Email />}
        type="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        onKeyDown={(event) =>
          event.code === 'Enter' && emailIsValid ? onSubmit(email) : undefined
        }
      />
      {submitType === 'primary' ? (
        <Button
          loading={loading}
          loadingOverflow
          fullWidth
          center
          type={submitType}
          disabled={!emailIsValid}
          onClick={() => onSubmit(email)}
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
            disabled={!emailIsValid}
            onClick={() => onSubmit(email)}
          >
            {submitText}
          </Button>
        </GradientBorder>
      )}
    </>
  )
}
