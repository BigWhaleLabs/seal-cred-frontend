import { AccentText, BodyText, SubheaderText } from 'components/Text'
import { FC, Suspense, useEffect, useState } from 'react'
import { SCERC721Derivative } from '@big-whale-labs/street-cred-ledger-contract'
import { handleError } from 'helpers/handleError'
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
  contract: SCERC721Derivative
}> = ({ contract }) => {
  const [name, setName] = useState<string>()

  useEffect(() => {
    async function fetchContractName() {
      try {
        const contractName = await contract.name()
        setName(contractName ? contractName : contract.address)
      } catch (error) {
        handleError(error)
      }
    }

    void fetchContractName()
  }, [contract])

  return (
    <Suspense fallback={<AccentText>Fetching the contract name...</AccentText>}>
      <div className={tokenCard}>
        <BodyText>{name}</BodyText>
        <button onClick={() => console.log('MINT!')}>mint</button>
      </div>
    </Suspense>
  )
}

function ContractList() {
  const { derivativeContracts } = useWritableSnapshot(StreetCredStore)
  const [contracts, setContracts] = useState<SCERC721Derivative[]>()

  useEffect(() => {
    async function fetchUnmintedContracts() {
      const allContracts = await derivativeContracts
      setContracts(allContracts?.unminted)
    }

    void fetchUnmintedContracts()
  }, [derivativeContracts])

  return (
    <>
      {contracts?.length ? (
        contracts.map((contract) => (
          <Contract key={contract.address} contract={contract} />
        ))
      ) : (
        <SubheaderText>You don't have any supported tokens yet.</SubheaderText>
      )}
    </>
  )
}

export default function UnmintedDerivatives() {
  return (
    <Suspense
      fallback={<BodyText>Fetching unminted badges for you...</BodyText>}
    >
      <ContractList />
    </Suspense>
  )
}
