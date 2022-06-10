import { useState } from 'preact/hooks'
import Button from 'components/Button'
import Input from 'components/Input'

export default function ({
  onSubmit,
  placeholder = 'Enter...',
  submitText = 'Submit',
}: {
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
        fullWidth
        center
        small
        primary
        disabled={text.length === 0}
        onClick={() => onSubmit(text)}
      >
        {submitText}
      </Button>
    </>
  )
}
