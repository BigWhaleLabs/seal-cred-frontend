import {
  AccentText,
  ErrorText,
  HeaderText,
  SubheaderText,
} from 'components/Text'
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
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import AddressPanel from 'components/AddressPanel'
import Balance from 'components/Balance'
import Card from 'components/Card'
import CopyPrivateKey from 'components/CopyPrivateKey'
import PublicAccountStore from 'stores/PublicAccountStore'
import PublicTokens from 'components/PublicTokens'
import configuredModal from 'helpers/configuredModal'

const outerContainer = classnames(margin('my-4'))
const addressContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
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

const inactiveAccount = classnames(
  display('flex'),
  justifyContent('justify-center')
)

export default function PublicAddress() {
  const { account } = useSnapshot(PublicAccountStore)

  const isActive = PublicAccountStore.isActive(account)

  useEffect(() => {
    if (configuredModal.cachedProvider) {
      void PublicAccountStore.onConnect()
    }
  }, [])

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
              {account.address} <Balance account={account} />
            </AccentText>
          </div>
          <CopyPrivateKey />
          <AddressPanel />
        </div>
        {!isActive && (
          <div className={inactiveAccount}>
            <ErrorText>
              It looks like some other address is selected in your wallet, try
              changing it to the selected
            </ErrorText>
          </div>
        )}
        <PublicTokens />
      </Card>
    </div>
  )
}
