import { width } from 'classnames/tailwind'
import Button from 'components/ui/Button'
import Email from 'icons/Email'
import GradientBorder from 'components/ui/GradientBorder'
import Input from 'components/ui/Input'
import removeFromArrByIndex from 'helpers/removeFromArrByIndex'
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
  const { email, setEmail, emailList, setEmailList, listIsValid } =
    useEmailForm()

  return (
    <>
      <Input
        leftIcon={
          <div className={width('w-3.5')}>
            <Email />
          </div>
        }
        placeholder={emailList.length ? 'another one' : placeholder}
        value={email}
        valueList={emailList}
        setValueList={setEmailList}
        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        onKeyDown={(event) => {
          if (emailList && !email && event.code === 'Backspace')
            setEmailList(removeFromArrByIndex(emailList, emailList.length - 1))

          if (event.code === 'Enter' && listIsValid) onSubmit(email)
        }}
      />
      {submitType === 'primary' ? (
        <Button
          loading={loading}
          loadingOverflow
          fullWidth
          center
          type={submitType}
          disabled={!listIsValid}
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
            disabled={!listIsValid}
            onClick={() => onSubmit(email)}
          >
            {submitText}
          </Button>
        </GradientBorder>
      )}
    </>
  )
}
