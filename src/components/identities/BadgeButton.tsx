import * as api from 'helpers/api'
import Button, { ButtonType } from 'components/Button'

export default function BadgeButton({ template }: { template: string }) {
  function onClick() {
    void api.createBadge(template)
  }

  return (
    <Button type={ButtonType.accent} onClick={onClick}>
      Create
    </Button>
  )
}
