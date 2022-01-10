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
import { useSnapshot } from 'valtio'
import { useState } from 'react'
import Button from 'components/Button'
import Card from 'components/Card'
import PublicAccountStore from 'stores/PublicAccountStore'
import PublicBadges from 'components/PublicBadges'
import copy from 'copy-to-clipboard'
import useAddress from 'hooks/useAddress'

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
const textCenter = classnames(textAlign('text-center'))

export default function PublicAddress() {
  const publicAccountStoreSnapshot = useSnapshot(PublicAccountStore)
  const [copied, setCopied] = useState(false)
  const address = useAddress()

  return (
    <div className={outerContainer}>
      <Card shadow>
        <HeaderText>One identity to rule them all</HeaderText>
        {!!address && (
          <div className={textCenter}>
            <SubheaderText>
              This is the public snapshot of this address. It contains all the
              public NFT badges the owner decided to reveal.
            </SubheaderText>
          </div>
        )}
        {!address && (
          <>
            <SubheaderText>
              This identity has been generated for you automatically. It will
              persist between reloads of this page. However, make sure to save
              your private key somewhere safe. You don't want to lose it!
            </SubheaderText>
            <SubheaderText>
              Connect any identities you want below. The attestation badges
              won't be public until you link them to this public ETH address.
            </SubheaderText>
          </>
        )}
        <div className={addressContainer}>
          <div className={addressBackground}>
            <AccentText>
              {address || publicAccountStoreSnapshot.mainEthWallet.address}
            </AccentText>
          </div>
          {!address && (
            <Button
              color="accent"
              onClick={() => {
                setCopied(true)
                copy(PublicAccountStore.mainEthWallet.privateKey)
              }}
            >
              {copied ? 'Copied to the clipboard!' : 'Copy private key'}
            </Button>
          )}
        </div>
        <PublicBadges />
      </Card>
    </div>
  )
}
