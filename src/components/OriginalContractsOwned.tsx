import { BodyText, SubheaderText } from 'components/Text'
import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'
import { FC, Suspense, useEffect, useState } from 'react'
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

const Contract: FC<{
  contract: ERC721
}> = ({ contract }) => {
  const [name, setName] = useState<string>()

  useEffect(() => {
    async function fetchName() {
      const name = await contract.name()
      setName(name || contract.address)
    }

    void fetchName()
  }, [contract])

  return (
    <div className={tokenCard}>
      <BodyText>{name ? name : contract.address}</BodyText>
    </div>
  )
}

function ContractList() {
  const { originalContracts } = useSnapshot(StreetCredStore)
  const [mintedOriginals, setMintedOriginals] = useState<ERC721[]>()

  useEffect(() => {
    async function fetchMintedOriginals() {
      const allOriginals = await originalContracts
      setMintedOriginals(allOriginals?.minted)
    }

    void fetchMintedOriginals()
  }, [originalContracts])

  return (
    <>
      {mintedOriginals?.length ? (
        mintedOriginals.map((contract) => (
          <Contract key={contract.address} contract={contract} />
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
