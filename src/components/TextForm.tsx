import { GradientSpan } from 'components/Text'
import { useState } from 'preact/hooks'
import Button from 'components/Button'
import Input from 'components/Input'

export default function ({
  loading,
  onSubmit,
  placeholder = 'Enter...',
  submitText = 'Submit',
}: {
  loading?: boolean
  onSubmit: (text?: string) => void
  placeholder?: string
  submitText?: string
}) {
  const [text, setText] = useState('')

  return (
    <>
      <Input
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText((e.target as HTMLInputElement).value || '')}
        onKeyDown={(event) =>
          event.code === 'Enter' ? onSubmit(text) : undefined
        }
      />
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
