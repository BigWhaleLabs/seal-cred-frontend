import { BadgeText } from 'components/Text'
import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'
import {
  alignItems,
  classnames,
  display,
  flexDirection,
  justifyContent,
  justifySelf,
  padding,
  space,
  textColor,
  width,
} from 'classnames/tailwind'
import Button from 'components/Button'
import React from 'react'
import proofStore from 'stores/ProofStore'

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
const listTokenAction = classnames(
  justifySelf('justify-self-end'),
  display('flex'),
  alignItems('items-center'),
  flexDirection('flex-row'),
  space('space-x-2')
)

export const ZKProofGenerateContent = ({
  originalContract,
  derivativeContract,
}: {
  originalContract: ERC721
  derivativeContract: SCERC721Derivative
}) => {
  return (
    <div className={listWrapper}>
      <div className={listTokenTitle}>
        <BadgeText>{derivativeContract.name}</BadgeText>
      </div>

      <div className={listTokenAction}>
        <Button
          color="success"
          onClick={() => {
            void proofStore.generate(originalContract.address)
          }}
          badge
        >
          Generate
        </Button>
      </div>
    </div>
  )
}

function ListOfAvailableZKProofs() {
  const availableBadges = [] as {
    derivativeContract: SCERC721Derivative
    originalContract: ERC721
  }[]

  return (
    <React.Suspense fallback={'loading'}>
      {availableBadges.map((props) => (
        <ZKProofGenerateContent {...props} />
      ))}
    </React.Suspense>
  )
}

export default ListOfAvailableZKProofs
