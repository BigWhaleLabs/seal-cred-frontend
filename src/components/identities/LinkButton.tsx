import * as api from 'helpers/api'
import { TokenStatus } from 'models/Token'
import { useState } from 'react'
import Button, { ButtonType } from 'components/Button'

const TokenStyleType = {
  [TokenStatus.linked]: ButtonType.error,
  [TokenStatus.minted]: ButtonType.success,
  [TokenStatus.unminted]: ButtonType.accent,
}

const TokenStyleText = {
  [TokenStatus.linked]: 'Unlink',
  [TokenStatus.minted]: 'Link',
  [TokenStatus.unminted]: 'Minting',
}

export default function LinkButton({
  status: initialStatus,
  template,
}: {
  status: TokenStatus
  template: string
}) {
  const [status, setStatus] = useState(initialStatus)
  const canLink = status !== TokenStatus.unminted

  async function onClick() {
    if (canLink) {
      const { status: current } = await api.linkBadge(
        template,
        status !== TokenStatus.linked
      )
      setStatus(current)
    }
  }

  return (
    <Button type={TokenStyleType[status]} onClick={onClick} disabled={!canLink}>
      {TokenStyleText[status]}
    </Button>
  )
}
