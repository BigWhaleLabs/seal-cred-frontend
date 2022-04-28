import { AccentText, SubheaderText } from 'components/Text'
import { Suspense, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import Badge from 'components/Badge'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexWrap,
  gap,
  justifyContent,
} from 'classnames/tailwind'

const badgesWrapper = classnames(
  display('flex'),
  flexDirection('flex-row'),
  flexWrap('flex-wrap'),
  gap('gap-4'),
  justifyContent('justify-center'),
  alignItems('items-center')
)

function TokenList() {
  const { derivativeContractsOwned } = useSnapshot(StreetCredStore)

  return (
    <>
      {derivativeContractsOwned && derivativeContractsOwned.length ? (
        <div className={badgesWrapper}>
          {derivativeContractsOwned.map((contract, index) => {
            const { name, address, symbol } = contract
            return (
              <Badge
                key={index}
                tokenName={name}
                tokenSymbol={symbol}
                contractAddress={address}
              />
            )
          })}
        </div>
      ) : (
        <SubheaderText>You didn't mint anything yet.</SubheaderText>
      )}
    </>
  )
}

function MintedDerivativeNft() {
  const { account } = useSnapshot(WalletStore)
  useEffect(() => {
    StreetCredStore.handleAccountChange(account)
  }, [account])

  return (
    <Suspense fallback={<AccentText>Fetching minted tokens...</AccentText>}>
      <TokenList />
    </Suspense>
  )
}

export default MintedDerivativeNft
