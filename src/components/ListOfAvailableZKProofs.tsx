import { AccentText, BadgeText, SubheaderText } from 'components/Text'
import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'
import { FC, Suspense, useEffect, useRef, useState } from 'react'
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
import StreetCredStore from 'stores/StreetCredStore'
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
  const task = useRef(tasks[token.address])

  useEffect(
    () =>
      subscribe(proofStore.tasks, () => {
        task.current = proofStore.tasks[token.address]
      }),
    [token.address]
  )

  const [contractName, setContractName] = useState('')

  const isProcessing = task.current?.status
    ? [ProofStatus.scheduled, ProofStatus.running].includes(
        task.current?.status
      )
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
            {contractName}{' '}
            {typeof task.current?.position !== 'undefined' && (
              <>position #{task.current?.position}</>
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
            {isProcessing ? 'processing' : 'generate'}
          </Button>
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
        contracts.minted.filter(
          (token) => !proofStore.proofsReady.has(token.address)
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
  return (
    <Suspense fallback={<AccentText>Fetching proofs...</AccentText>}>
      <ZKProofList />
    </Suspense>
  )
}

export default ListOfAvailableZKProofs
