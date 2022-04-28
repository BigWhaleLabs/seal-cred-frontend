import { AccentText, SubheaderText } from 'components/Text'
import { SCERC721Derivative } from '@big-whale-labs/street-cred-ledger-contract'
import { Suspense, useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import Badge from 'components/Badge'
import StreetCredStore from 'stores/StreetCredStore'
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
  const { derivativeContracts } = useSnapshot(StreetCredStore)
  const [mintedDerivatives, setMintedDerivatives] =
    useState<SCERC721Derivative[]>()

  useEffect(() => {
    async function fetchMintedDerivatives() {
      const allDerivatives = await derivativeContracts
      setMintedDerivatives(allDerivatives?.minted)
    }

    void fetchMintedDerivatives()
  }, [derivativeContracts])

  return (
    <>
      {mintedDerivatives?.length ? (
        <div className={badgesWrapper}>
          {mintedDerivatives.map((contract, index) => {
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
  return (
    <Suspense fallback={<AccentText>Fetching minted tokens...</AccentText>}>
      <TokenList />
    </Suspense>
  )
}

export default MintedDerivativeNft
