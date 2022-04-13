import { AccentText, HeaderText, SubheaderText } from 'components/Text'
import {
  alignItems,
  backgroundColor,
  borderRadius,
  classnames,
  display,
  flexDirection,
  justifyContent,
  margin,
  padding,
  space,
  textAlign,
  transitionProperty,
  wordBreak,
} from 'classnames/tailwind'
import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Card from 'components/Card'
import Loading from 'components/Loading'
import PublicAccountStore from 'stores/PublicAccountStore'
import PublicTokens from 'components/PublicTokens'
import copy from 'copy-to-clipboard'

const outerContainer = classnames(margin('my-4'))
const addressContainer = classnames(
  display('flex'),
  flexDirection('flex-col', 'lg:flex-row'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  space('space-y-2', 'lg:space-y-0', 'lg:space-x-2'),
  margin('mt-10')
)
const addressBackground = classnames(
  transitionProperty('transition-colors'),
  borderRadius('rounded-2xl'),
  backgroundColor('bg-accent-light'),
  textAlign('text-center'),
  wordBreak('break-all'),
  padding('py-4', 'px-6')
)

export default function PublicAddress() {
  const { mainEthWallet, balance, getBalance } = useSnapshot(PublicAccountStore)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    void getBalance() // Set balance on initialization
  })

  return (
    <div className={outerContainer}>
      <Card shadow>
        <HeaderText>One identity to rule them all</HeaderText>
        <>
          <SubheaderText>
            This identity has been generated for you automatically. It will
            persist between reloads of this page. However, make sure to save
            your private key somewhere safe. You don't want to lose it!
          </SubheaderText>
          <SubheaderText>
            Connect any identities you want below. The attestation badges won't
            be public until you link them to this public ETH address.
          </SubheaderText>
        </>
        <div className={addressContainer}>
          <div className={addressBackground}>
            <AccentText>
              {mainEthWallet.address}{' '}
              {balance ? `· ${balance} ETH` : <Loading small />}
            </AccentText>
          </div>
          <Button
            color="accent"
            onClick={() => {
              setCopied(true)
              copy(PublicAccountStore.mainEthWallet.privateKey)
            }}
          >
            {copied ? 'Copied to the clipboard!' : 'Copy private key'}
          </Button>
        </div>
        <PublicTokens />
      </Card>
    </div>
  )
}
