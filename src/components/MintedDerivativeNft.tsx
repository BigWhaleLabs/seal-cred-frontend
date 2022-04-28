import { AccentText, SubheaderText } from 'components/Text'
import { Suspense } from 'react'
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

  return (
    <>
      {derivativeContracts?.owned?.length ? (
        <div className={badgesWrapper}>
          {derivativeContracts.owned.map((contract, index) => {
            return <Badge key={index} address={contract.address} />
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
