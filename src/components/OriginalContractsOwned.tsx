import { AccentText, BodyText, SubheaderText } from 'components/Text'
import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'
import { FC, Suspense, useEffect, useState } from 'react'
import StreetCredStore from 'stores/StreetCredStore'
import classnames, {
  display,
  justifyContent,
  padding,
} from 'classnames/tailwind'
import useWritableSnapshot from 'helpers/useWritableSnapshot'

const tokenCard = classnames(
  display('flex'),
  justifyContent('justify-between'),
  padding('py-2')
)

const Contract: FC<{
  contract: ERC721
}> = ({ contract }) => {
  const [name, setName] = useState<Promise<string>>()

  setName(contract.name())

  return (
    <Suspense fallback={<AccentText>Fetching the contract name...</AccentText>}>
      <div className={tokenCard}>
        <BodyText>{name ? name : contract.address}</BodyText>
      </div>
    </Suspense>
  )
}

function ContractList() {
  const { originalContracts } = useWritableSnapshot(StreetCredStore)
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
