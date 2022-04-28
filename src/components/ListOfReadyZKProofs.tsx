import { AccentText, SubheaderText } from 'components/Text'
import {
  classnames,
  display,
  justifyContent,
  padding,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ContractName from 'components/ContractName'
import React, { FC } from 'react'
import StreetCredStore from 'stores/StreetCredStore'
import proofStore from 'stores/ProofStore'

const tokenCard = classnames(
  display('flex'),
  justifyContent('justify-between'),
  padding('py-2')
)

const ReadyZKProof: FC<{
  address: string
}> = ({ address }) => {
  return (
    <div className={tokenCard}>
      <ContractName address={address} />
    </div>
  )
}

function ZKProofList() {
  const { proofsReady } = useSnapshot(proofStore)
  const { originalContracts } = useSnapshot(StreetCredStore)

  const availableBadges = originalContracts?.owned.filter(
    (token) => typeof proofsReady[token.address] !== 'undefined'
  )

  return (
    <>
      {availableBadges && availableBadges.length > 0 ? (
        <Card>
          {availableBadges.map((contract, index) => (
            <ReadyZKProof key={index} address={contract.address} />
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
    <React.Suspense fallback={<AccentText>Fetching proofs...</AccentText>}>
      <ZKProofList />
    </React.Suspense>
  )
}

export default ListOfReadyZKProofs
