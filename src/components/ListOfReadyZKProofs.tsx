import { AccentText, BadgeText, SubheaderText } from 'components/Text'
import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'
import {
  classnames,
  display,
  justifyContent,
  padding,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import React, { FC, useEffect, useState } from 'react'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'
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
  const { proofsReady } = useSnapshot(proofStore)
  const { originalContracts } = useSnapshot(StreetCredStore)

  const availableBadges = originalContracts.filter((token) =>
    proofsReady.has(token.address)
  )

  return (
    <>
      {availableBadges.length > 0 ? (
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
  const { account } = useSnapshot(WalletStore)

  useEffect(() => {
    StreetCredStore.refreshOriginalContracts(account)
  }, [account])

  return (
    <React.Suspense fallback={<AccentText>Fetching proofs...</AccentText>}>
      <ZKProofList />
    </React.Suspense>
  )
}

export default ListOfReadyZKProofs
