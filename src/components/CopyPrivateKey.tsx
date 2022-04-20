import { useState } from 'react'
import Button from 'components/Button'
import PublicAccountStore from 'stores/PublicAccountStore'
import copy from 'copy-to-clipboard'

export default function CopyPrivateKey() {
  const [copied, setCopied] = useState(false)

  if (!PublicAccountStore.privateKey) {
    return null
  }

  function onCopy() {
    setCopied(true)
    copy(PublicAccountStore.privateKey ?? '')
  }

  return (
    <Button color="accent" onClick={onCopy}>
      {copied ? 'Copied to the clipboard!' : 'Copy private key'}
    </Button>
  )
}
