import { BadgeText } from 'components/Text'
import {
  alignItems,
  classnames,
  display,
  flexDirection,
  justifyContent,
  padding,
  space,
  textColor,
  width,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import React from 'react'
import StreetCredStore from 'stores/StreetCredStore'

const listWrapper = classnames(
  display('flex'),
  justifyContent('justify-start'),
  alignItems('items-center'),
  padding('py-2'),
  space('space-x-2')
)
const listTokenTitle = classnames(
  display('flex'),
  flexDirection('flex-col'),
  width('w-full'),
  textColor('text-white')
)

export const ZKProofReadyContent = ({ address }: { address: string }) => {
  const { ledger } = useSnapshot(StreetCredStore)
  const record = ledger.get(address)
  if (!record) return null

  const { derivativeContract } = record

  return (
    <div className={listWrapper}>
      <div className={listTokenTitle}>
        <BadgeText>{derivativeContract.name}</BadgeText>
      </div>
    </div>
  )
}

function ZKProofReady(props: { address: string }) {
  return (
    <React.Suspense fallback={'loading'}>
      <ZKProofReadyContent {...props} />
    </React.Suspense>
  )
}

export default ZKProofReady
