import { AccentText, HeaderText, SubheaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import { useState } from 'react'
import Button from 'components/Button'
import Card from 'components/Card'
import PublicAccountStore from 'stores/PublicAccountStore'
import copy from 'copy-to-clipboard'
import useAddress from 'hooks/useAddress'

const outerContainer = classnames('my-4')
const addressContainer = classnames(
  'flex',
  'flex-col',
  'lg:flex-row',
  'items-center',
  'justify-center',
  'space-y-2',
  'lg:space-y-0',
  'lg:space-x-2',
  'mt-10'
)
const addressBackground = classnames(
  'transition-colors',
  'py-4',
  'px-6',
  'rounded-2xl',
  'bg-accent-light',
  'text-center',
  'break-all'
)

export default function PublicAddress() {
  const publicAccountStoreSnapshot = useSnapshot(PublicAccountStore)
  const [copied, setCopied] = useState(false)
  const address = useAddress()

  return (
    <div className={outerContainer}>
      <Card shadow>
        <HeaderText>One identity to rule them all</HeaderText>
        <SubheaderText>
          This identity has been generated for you automatically. It will
          persist between reloads of this page. However, make sure to save you
          private key somewhere safe. You don't want to loose it!
        </SubheaderText>
        <SubheaderText>
          Connect any identities you want below. The attestation badges won't be
          public until you link them to this public ETH address.
        </SubheaderText>
        <div className={addressContainer}>
          <div className={addressBackground}>
            <AccentText>
              {address || publicAccountStoreSnapshot.mainEthWallet.address}
            </AccentText>
          </div>
          {!address && (
            <Button
              type="accent"
              onClick={() => {
                setCopied(true)
                copy(PublicAccountStore.mainEthWallet.privateKey)
              }}
            >
              {copied ? 'Copied to the clipboard!' : 'Copy private key'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
