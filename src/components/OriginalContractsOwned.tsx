import { BodyText, SubheaderText } from 'components/Text'
import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'
import { FC, Suspense, useEffect, useState } from 'react'
import { handleError } from 'helpers/handleError'
import { useSnapshot } from 'valtio'
import StreetCredStore from 'stores/StreetCredStore'
import classnames, {
  display,
  justifyContent,
  padding,
} from 'classnames/tailwind'

const tokenCard = classnames(
  display('flex'),
  justifyContent('justify-between'),
  padding('py-2')
)

// TODO: use valtio suspense here instead

const Contract: FC<{
  nameFetcher: ERC721['name']
  address: string
}> = ({ nameFetcher, address }) => {
  const [name, setName] = useState<string>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchName() {
      setLoading(true)
      try {
        const name = await nameFetcher()
        setName(name || address)
      } catch (error) {
        handleError(error)
      } finally {
        setLoading(false)
      }
    }

    void fetchName()
  }, [nameFetcher, address])

  return (
    <div className={tokenCard}>
      <BodyText>{loading ? 'Loading...' : name}</BodyText>
    </div>
  )
}

function ContractList() {
  const { originalContracts } = useSnapshot(StreetCredStore)
  return (
    <>
      {originalContracts?.minted?.length ? (
        originalContracts?.minted.map((contract) => (
          <Contract
            key={contract.address}
            nameFetcher={contract.name}
            address={contract.address}
          />
        ))
      ) : (
        <SubheaderText>You don't have any supported tokens yet.</SubheaderText>
      )}
    </>
  )
}

export default function OriginalContractsOwned() {
  return (
    <Suspense
      fallback={<BodyText>Fetching available tokens owned by you...</BodyText>}
    >
      <ContractList />
    </Suspense>
  )
}
