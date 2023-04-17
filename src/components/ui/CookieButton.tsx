import Button from 'components/ui/Button'

export default function ({
  callback,
  small,
}: {
  small?: boolean
  callback: () => void
}) {
  return (
    <Button small={small} type="primary" onClick={callback}>
      Got it
    </Button>
  )
}
