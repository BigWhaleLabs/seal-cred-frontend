import { AccentText, BadgeText, SubheaderText } from 'components/Text'
import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'
import { ProofStatus } from 'helpers/callProof'
import {
  classnames,
  display,
  justifyContent,
  padding,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Card from 'components/Card'
import React, { FC, useEffect, useState } from 'react'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'
import proofStore from 'stores/ProofStore'

/*
 TODO: Display "Supported NFTs that you own" minus the ZK proofs that are already generated (or take it from ProofStore?)
 TODO: each ZK proof that can be generated should have the button "generate", which should call ProofStore.generate method
 TODO: proofs that are being generated should be taken from ProofStore, just being displayed here, no actual business-logic should be present in the UI
 TODO: we should be able to generate multiple proofs at a time (even though they are queued)
 TODO: we should display the queue position of the jobs 
*/

const tokenCard = classnames(
  display('flex'),
  justifyContent('justify-between'),
  padding('py-2')
)

const ZKProof: FC<{ token: { name: ERC721['name']; address: string } }> = ({
  token,
}) => {
  const { tasks } = useSnapshot(proofStore)
  const task = tasks.get(token.address)
  const [contractName, setContractName] = useState('')

  const isProcessing = task?.status
    ? [ProofStatus.scheduled, ProofStatus.running].includes(task?.status)
    : false

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
          <BadgeText>
            {contractName}
            {typeof task?.position !== 'undefined' && (
              <>position# {task?.position}</>
            )}
          </BadgeText>
          <Button
            badge
            color="success"
            disabled={isProcessing}
            onClick={() => {
              try {
                void proofStore.generate(token.address)
              } catch (e) {
                console.error(e)
              }
            }}
          >
            generate
          </Button>
        </div>
      )}
    </>
  )
}

function ZKProofList() {
  const { proofsReady } = useSnapshot(proofStore)
  const { originalContracts } = useSnapshot(StreetCredStore)
  const [availableBadges, setAvailableBadges] = useState<ERC721[]>()

  useEffect(() => {
    async function fetchContractName() {
      if (!originalContracts) return
      const contracts = await originalContracts
      setAvailableBadges(
        contracts.minted.filter((token) => !proofsReady.has(token.address))
      )
    }
    void fetchContractName()
  }, [originalContracts, proofsReady])

  if (!originalContracts) return null

  return (
    <>
      {availableBadges && availableBadges.length > 0 ? (
        <Card>
          {availableBadges.map((contract, index) => (
            <ZKProof key={index} token={contract} />
          ))}
        </Card>
      ) : (
        <SubheaderText>You didn't have any avaliable proof</SubheaderText>
      )}
    </>
  )
}

function ListOfAvailableZKProofs() {
  const { account } = useSnapshot(WalletStore)

  useEffect(() => {
    StreetCredStore.handleAccountChange(account)
  }, [account])

  return (
    <React.Suspense fallback={<AccentText>Fetching proofs...</AccentText>}>
      <ZKProofList />
    </React.Suspense>
  )
}

export default ListOfAvailableZKProofs
