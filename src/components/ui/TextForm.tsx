import { useState } from 'preact/hooks'
import Button from 'components/ui/Button'
import Input from 'components/ui/Input'
import TinyMessage from 'components/ui/TinyMessage'

export default function ({
  error,
  loading,
  onSubmit,
  placeholder = 'Enter...',
  submitText = 'Submit',
  submitType = 'primary',
  value,
}: {
  error?: string
  value?: string
  loading?: boolean
  submitType?: 'primary' | 'secondary' | 'tertiary'
  onSubmit: (text: string) => void
  placeholder?: string
  submitText?: string
}) {
  const [text, setText] = useState(value ?? '')
  const hasError = !!error

  return (
    <>
      <Input
        disabled={loading}
        isError={hasError}
        placeholder={placeholder}
        type="text"
        value={text}
        onChange={(e) => setText((e.target as HTMLInputElement).value || '')}
        onKeyDown={(event) =>
          event.code === 'Enter' && text.length ? onSubmit(text) : undefined
        }
      />
      {hasError && <TinyMessage withIcon state="error" text={error} />}
      <Button
        center
        fullWidth
        disabled={text.length === 0}
        gradientFont={submitType !== 'primary'}
        loading={loading}
        small={submitType !== 'primary'}
        type={submitType}
        onClick={() => onSubmit(text)}
      >
        {loading ? 'Generating...' : submitText}
      </Button>
    </>
  )
}
