import { BadgeText } from 'components/Text'
import { Suspense, useEffect, useState } from 'react'
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

export function ZKProofReadyContent({ address }: { address: string }) {
  const { derivativeContracts } = useSnapshot(StreetCredStore)
  const [contractName, setContractName] = useState<string>()

  useEffect(() => {
    async function fetchContractName() {
      const contracts = await derivativeContracts
      if (!contracts) return
      setContractName(
        // TODO: make sure, that this works fine
        await contracts.unminted
          .find((value) => value.address === address)
          ?.name()
      )
    }

    void fetchContractName()
  })

  return (
    <div className={listWrapper}>
      <div className={listTokenTitle}>
        <BadgeText>{contractName}</BadgeText>
      </div>
    </div>
  )
}

function ZKProofReady(props: { address: string }) {
  return (
    <Suspense fallback={'loading'}>
      <ZKProofReadyContent {...props} />
    </Suspense>
  )
}

export default ZKProofReady
