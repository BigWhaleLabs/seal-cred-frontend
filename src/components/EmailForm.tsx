import { width } from 'classnames/tailwind'
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
        leftIcon={
          <div className={width('w-3.5')}>
            <Email />
          </div>
        }
        type="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        onKeyDown={(event) =>
          event.code === 'Enter' && emailIsValid ? onSubmit(email) : undefined
        }
      />
      <GradientBorder>
        <Button
          gradientFont={submitType !== 'primary'}
          loading={loading}
          loadingOverflow
          fullWidth
          center
          small={submitType !== 'primary'}
          type={submitType}
          disabled={!emailIsValid}
          onClick={() => onSubmit(email)}
        >
          {submitText}
        </Button>
      </GradientBorder>
    </>
  )
}
