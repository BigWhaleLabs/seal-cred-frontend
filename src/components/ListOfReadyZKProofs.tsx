import { AccentText, BadgeText, SubheaderText } from 'components/Text'
import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'
import { FC, Suspense, useEffect, useState } from 'react'
import {
  classnames,
  display,
  justifyContent,
  padding,
} from 'classnames/tailwind'
import Card from 'components/Card'
import StreetCredStore from 'stores/StreetCredStore'
import proofStore from 'stores/ProofStore'

const tokenCard = classnames(
  display('flex'),
  justifyContent('justify-between'),
  padding('py-2')
)

const ReadyZKProof: FC<{
  token: { name: ERC721['name']; address: string }
}> = ({ token }) => {
  const [contractName, setContractName] = useState('')

  useEffect(() => {
    async function fetchContractName() {
      try {
        const contractName = await token.name()
        setContractName(
          contractName.length ? contractName : `Contract: ${token.address}`
        )
      } catch (error) {
        console.error(error)
      }
    }

    void fetchContractName()
  }, [token])

  return (
    <>
      {contractName && (
        <div className={tokenCard}>
          <BadgeText>{contractName}</BadgeText>
        </div>
      )}
    </>
  )
}

function ZKProofList() {
  const [availableBadges, setAvailableBadges] = useState<ERC721[]>()

  useEffect(() => {
    async function fetchContractName() {
      if (!StreetCredStore.originalContracts) return
      const contracts = await StreetCredStore.originalContracts
      setAvailableBadges(
        contracts.minted.filter((token) =>
          proofStore.proofsReady.has(token.address)
        )
      )
    }
    void fetchContractName()
  }, [])

  return (
    <>
      {availableBadges && availableBadges.length > 0 ? (
        <Card>
          {availableBadges.map((contract, index) => (
            <ReadyZKProof key={index} token={contract} />
          ))}
        </Card>
      ) : (
        <SubheaderText>You didn't have any created proof</SubheaderText>
      )}
    </>
  )
}

function ListOfReadyZKProofs() {
  return (
    <Suspense fallback={<AccentText>Fetching proofs...</AccentText>}>
      <ZKProofList />
    </Suspense>
  )
}

export default ListOfReadyZKProofs
