import Button, { ButtonType } from 'components/Button'

export default function BadgeButton({ onClick }: { onClick: () => void }) {
  return (
    <Button type={ButtonType.accent} onClick={onClick}>
      Create
    </Button>
  )
}
