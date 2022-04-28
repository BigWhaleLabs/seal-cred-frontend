import { AccentText, BadgeText, SubheaderText } from 'components/Text'
import { ProofStatus } from 'helpers/callProof'
import {
  classnames,
  display,
  justifyContent,
  padding,
} from 'classnames/tailwind'
import { subscribe, useSnapshot } from 'valtio'
import Button from 'components/Button'
import Card from 'components/Card'
import ContractName from 'components/ContractName'
import React, { FC, useEffect, useRef } from 'react'
import StreetCredStore from 'stores/StreetCredStore'
import proofStore from 'stores/ProofStore'

const tokenCard = classnames(
  display('flex'),
  justifyContent('justify-between'),
  padding('py-2')
)

const ZKProof: FC<{ contractAddress: string }> = ({ contractAddress }) => {
  const { proofsInProgress } = useSnapshot(proofStore)
  const proofInProgress = useRef(proofsInProgress[contractAddress])

  useEffect(
    () =>
      subscribe(proofStore.proofsInProgress, () => {
        proofInProgress.current = proofStore.proofsInProgress[contractAddress]
      }),
    [contractAddress]
  )

  const job = proofInProgress.current
  const showPosition = job && job?.position && job?.position > 0
  const isProcessing =
    job && [ProofStatus.scheduled, ProofStatus.running].includes(job?.status)

  function onGenerate() {
    void proofStore.generate(contractAddress)
  }

  return (
    <div className={tokenCard}>
      <BadgeText>
        <ContractName address={contractAddress} />
        {showPosition && <>position# {job.position}</>}
      </BadgeText>
      <Button badge color="success" loading={isProcessing} onClick={onGenerate}>
        generate
      </Button>
    </div>
  )
}

function ZKProofList() {
  const { proofsReady } = useSnapshot(proofStore)
  const { originalContracts } = useSnapshot(StreetCredStore)

  const availableBadges = originalContracts?.owned.filter(
    (token) => typeof proofsReady[token.address] === 'undefined'
  )

  return (
    <>
      {availableBadges && availableBadges.length > 0 ? (
        <Card>
          {availableBadges.map((contract, index) => (
            <ZKProof key={index} contractAddress={contract.address} />
          ))}
        </Card>
      ) : (
        <SubheaderText>You didn't have any avaliable proof</SubheaderText>
      )}
    </>
  )
}

function ListOfAvailableZKProofs() {
  return (
    <React.Suspense fallback={<AccentText>Fetching proofs...</AccentText>}>
      <ZKProofList />
    </React.Suspense>
  )
}

export default ListOfAvailableZKProofs
