import { BadgesContractsStore } from 'stores/ContractsStore'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import BadgeCard from 'components/badges/BadgeCard'
import BadgeTitle from 'components/badges/BadgeTitle'
import BadgeWrapper from 'components/badges/BadgeWrapper'
import BaseProof from 'helpers/proofs/BaseProof'
import Button from 'components/ui/Button'
import MintedToken from 'models/MintedToken'
import ProofStore from 'stores/ProofStore'
import WalletStore from 'stores/WalletStore'
import data from 'data'
import handleError from 'helpers/handleError'

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

  const checkProofAndMint = async () => {
    WalletStore.mintLoading = true
    setLoading(true)
    try {
      if (!account) throw new Error('No account found')
      if (!proof?.result) throw new Error('No proof found')
      const transaction = await ProofStore[proof.dataType].mint(proof)
      if (onMinted) onMinted()
      BadgesContractsStore.connectedAccounts[account].applyTransaction(
        transaction
      )
    } catch (error) {
      if (onMintFailed) onMintFailed()
      handleError(error)
    } finally {
      setLoading(false)
      WalletStore.mintLoading = false
    }
  }

  const ProofIcon = data[proof.dataType].proofIcon

  return (
    <BadgeCard
      top={<ProofIcon />}
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
