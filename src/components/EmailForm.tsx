import { GradientSpan } from 'components/Text'
import Button from 'components/Button'
import Email from 'icons/Email'
import Input from 'components/Input'

export default function ({
  loading,
  onSubmit,
  value,
  onChange,
  isValid,
  placeholder = 'Enter...',
  submitText = 'Submit',
}: {
  value: string
  onChange: (e: Event) => void
  isValid: boolean
  loading?: boolean
  onSubmit: (email: string) => void
  submitText?: string
  placeholder?: string
}) {
  return (
    <>
      <Input
        leftIcon={<Email />}
        type="email"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={(event) =>
          event.code === 'Enter' && isValid ? onSubmit(value) : undefined
        }
      />
      <Button
        loading={loading}
        fullWidth
        center
        small
        type="secondary"
        disabled={!isValid}
        onClick={() => onSubmit(value)}
      >
        <GradientSpan bold gradientFrom="from-secondary" gradientTo="to-accent">
          {submitText}
        </GradientSpan>
      </Button>
    </>
  )
}
