import { useSnapshot } from 'valtio'
import { useState } from 'react'
import BadgeCard from 'components/badges/BadgeCard'
import BadgeTitle from 'components/badges/BadgeTitle'
import BadgeWrapper from 'components/badges/BadgeWrapper'
import BaseProof from 'helpers/BaseProof'
import Button from 'components/Button'
import EmailBadge from 'icons/EmailBadge'
import EmailProof from 'helpers/EmailProof'
import Erc721Badge from 'icons/Erc721Badge'
import ProofStore from 'stores/ProofStore'
import WalletStore from 'stores/WalletStore'
import handleError from 'helpers/handleError'

function Badge({ proof }: { proof: BaseProof }) {
  const { account } = useSnapshot(WalletStore)
  const [loading, setLoading] = useState(false)

  const isEmailProof = proof instanceof EmailProof

  const checkProofAndMint = async () => {
    setLoading(true)

    try {
      if (!account) throw new Error('No account found')
      if (!proof?.result) throw new Error('No proof found')

      await WalletStore.mintDerivative(proof)
      ProofStore.deleteProof(proof)
    } catch (error) {
      if (
        proof &&
        error instanceof Error &&
        error.message.includes('This ZK proof has already been used')
      ) {
        ProofStore.deleteProof(proof)
        handleError(
          new Error(
            'The ZK proof is invalid. This is a test net bug, please, regenerate the proof.'
          )
        )
      } else {
        handleError(error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <BadgeCard
      top={isEmailProof ? <EmailBadge /> : <Erc721Badge />}
      leanLeft={false}
      text={<BadgeTitle proof={proof} />}
      bottom={
        <Button
          small
          type="primary"
          loading={loading}
          disabled={!proof}
          onClick={checkProofAndMint}
        >
          {proof ? 'Mint badge' : 'Minted!'}
        </Button>
      }
    />
  )
}

export default function ({ proof }: { proof: BaseProof }) {
  return (
    <BadgeWrapper minted={false}>
      <Badge proof={proof} />
    </BadgeWrapper>
  )
}
