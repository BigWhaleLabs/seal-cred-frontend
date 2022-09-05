import { useState } from 'preact/hooks'
import Button from 'components/ui/Button'
import Input from 'components/ui/Input'
import TinyMessage from 'components/ui/TinyMessage'

export default function ({
  error,
  value,
  loading,
  onSubmit,
  submitType = 'primary',
  placeholder = 'Enter...',
  submitText = 'Submit',
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
        gradientFont={submitType !== 'primary'}
        loading={loading}
        fullWidth
        center
        small={submitType !== 'primary'}
        type={submitType}
        disabled={text.length === 0}
        onClick={() => onSubmit(text)}
      >
        {loading ? 'Generating...' : submitText}
      </Button>
    </>
  )
}
