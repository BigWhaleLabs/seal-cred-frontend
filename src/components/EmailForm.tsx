import Button from 'components/Button'
import Email from 'icons/Email'
import Input from 'components/Input'
import useEmailForm from 'hooks/useEmailForm'

export default function ({
  onSubmit,
  placeholder = 'Enter...',
  submitText = 'Submit',
}: {
  onSubmit: (email?: string) => void
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
        onChange={(e) => setEmail((e.target as HTMLInputElement).value || '')}
        onKeyDown={(event) =>
          event.code === 'Enter' && emailIsValid ? onSubmit(email) : undefined
        }
      />
      <Button
        fullWidth
        center
        small
        primary
        disabled={!emailIsValid}
        onClick={() => onSubmit(email)}
      >
        {submitText}
      </Button>
    </>
  )
}
