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

// TODO: replace fetching the name with suspense
// TODO: maybe we can pass the whole ERC721 contract to the Contract component, instead of just nameFetcher and address? useSnapshot somehow messes up the ERC721 type

const Contract: FC<{
  nameFetcher: ERC721['name']
  address: ERC721['address']
}> = ({ nameFetcher, address }) => {
  const [name, setName] = useState<string | undefined>()

  useEffect(() => {
    async function fetchContractName() {
      try {
        const contractName = await nameFetcher()
        setName(contractName.length ? contractName : address)
      } catch (error) {
        handleError(error)
      }
    }

    void fetchContractName()
  }, [nameFetcher, address])

  return name ? (
    <div className={tokenCard}>
      <BodyText>{name}</BodyText>
    </div>
  ) : (
    <BodyText>Loading...</BodyText>
  )
}

function ContractList() {
  const { originalContractsOwned } = useSnapshot(StreetCredStore)

  return (
    <>
      {originalContractsOwned?.length ? (
        originalContractsOwned.map((contract) => (
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

function OriginalContractsOwned() {
  return (
    <Suspense
      fallback={<BodyText>Fetching avaliable tokens owned by you...</BodyText>}
    >
      <ContractList />
    </Suspense>
  )
}

export default OriginalContractsOwned
