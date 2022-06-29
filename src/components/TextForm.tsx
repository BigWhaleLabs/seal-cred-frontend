import { GradientSpan } from 'components/Text'
import { useState } from 'preact/hooks'
import Button from 'components/Button'
import Input from 'components/Input'
import TinyMessage from 'components/TinyMessage'

export default function ({
  error,
  loading,
  onSubmit,
  placeholder = 'Enter...',
  submitText = 'Submit',
}: {
  error?: string
  loading?: boolean
  onSubmit: (text: string) => void
  placeholder?: string
  submitText?: string
}) {
  const [text, setText] = useState('')
  const hasError = !!error

  return (
    <>
      <Input
        type="text"
        isError={hasError}
        disabled={loading}
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText((e.target as HTMLInputElement).value || '')}
        onKeyDown={(event) =>
          event.code === 'Enter' && text.length ? onSubmit(text) : undefined
        }
      />
      {hasError && <TinyMessage withIcon state="error" text={error} />}
      <Button
        loading={loading}
        fullWidth
        center
        small
        type="secondary"
        disabled={text.length === 0}
        onClick={() => onSubmit(text)}
      >
        <GradientSpan bold gradientFrom="from-secondary" gradientTo="to-accent">
          {submitText}
        </GradientSpan>
      </Button>
    </>
  )
}
