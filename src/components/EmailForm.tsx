import { GradientSpan } from 'components/Text'
import Button from 'components/Button'
import Email from 'icons/Email'
import Input from 'components/Input'
import useEmailForm from 'hooks/useEmailForm'

export default function ({
  loading,
  onSubmit,
  placeholder = 'Enter...',
  submitText = 'Submit',
}: {
  loading?: boolean
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
      <Button
        loading={loading}
        fullWidth
        center
        small
        type="secondary"
        disabled={!emailIsValid}
        onClick={() => onSubmit(email)}
      >
        <GradientSpan bold gradientFrom="from-secondary" gradientTo="to-accent">
          {submitText}
        </GradientSpan>
      </Button>
    </>
  )
}
