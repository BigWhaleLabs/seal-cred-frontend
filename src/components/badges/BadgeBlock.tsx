import { GoerliContractsStore } from 'stores/ContractsStore'
import { handleError } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import BadgeCard from 'components/badges/BadgeCard'
import BadgeTitle from 'components/badges/BadgeTitle'
import BadgeWrapper from 'components/badges/BadgeWrapper'
import BaseProof from 'helpers/BaseProof'
import Button from 'components/Button'
import EmailBadge from 'icons/EmailBadge'
import EmailProof from 'helpers/EmailProof'
import Erc721Badge from 'icons/Erc721Badge'
import MintedToken from 'models/MintedToken'
import ProofStore from 'stores/ProofStore'
import WalletStore from 'stores/WalletStore'

function Badge({
  proof,
  onMinted,
  onMintFailed,
}: {
  proof: BaseProof
  onMinted?: (minted?: MintedToken[]) => void
  onMintFailed?: (minted?: MintedToken[]) => void
}) {
  const { account, mintLoading } = useSnapshot(WalletStore)
  const [loading, setLoading] = useState(false)

  const isEmailProof = proof instanceof EmailProof

  const checkProofAndMint = async () => {
    WalletStore.mintLoading = true
    setLoading(true)
    try {
      if (!account) throw new Error('No account found')
      if (!proof?.result) throw new Error('No proof found')
      const transaction = await WalletStore.mintDerivative(proof)
      ProofStore.deleteProof(proof)
      if (onMinted) onMinted()
      GoerliContractsStore.connectedAccounts[account].applyTransaction(
        transaction
      )
    } catch (error) {
      if (
        proof &&
        error instanceof Error &&
        error.message.includes('This ZK proof has already been used')
      ) {
        ProofStore.deleteProof(proof)
        if (onMintFailed) onMintFailed()
        handleError(
          new Error(
            'The ZK proof has been used before. Please, regenerate the proof.'
          )
        )
      } else {
        handleError(error)
      }
    } finally {
      setLoading(false)
      WalletStore.mintLoading = false
    }
  }

  return (
    <BadgeCard
      top={isEmailProof ? <EmailBadge /> : <Erc721Badge />}
      text={<BadgeTitle proof={proof} />}
      bottom={
        <Button
          small
          type="primary"
          loading={loading}
          disabled={!proof || mintLoading}
          onClick={checkProofAndMint}
        >
          {proof ? 'Mint badge' : 'Minted!'}
        </Button>
      }
    />
  )
}

export default function ({
  proof,
  onMinted,
  onMintFailed,
}: {
  proof: BaseProof
  onMinted?: (minted?: MintedToken[]) => void
  onMintFailed?: (minted?: MintedToken[]) => void
}) {
  return (
    <BadgeWrapper minted={false}>
      <Badge proof={proof} onMinted={onMinted} onMintFailed={onMintFailed} />
    </BadgeWrapper>
  )
}
