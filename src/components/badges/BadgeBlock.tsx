import { BadgesContractsStore } from 'stores/ContractsStore'
import { MintProof } from 'models/MintProof'
import { handleError } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import BadgeCard from 'components/badges/BadgeCard'
import BadgeTitle from 'components/badges/BadgeTitle'
import BadgeWrapper from 'components/badges/BadgeWrapper'
import Button from 'components/ui/Button'
import ProofStore from 'stores/ProofStore'
import WalletStore from 'stores/WalletStore'
import badgeConfig from 'badgeConfig'

function Badge({ proof, onMinted, onMintFailed }: MintProof) {
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

  const ProofIcon = badgeConfig[proof.badgeType].proofIcon

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

export default function ({ proof, onMinted, onMintFailed }: MintProof) {
  return (
    <BadgeWrapper minted={false}>
      <Badge proof={proof} onMinted={onMinted} onMintFailed={onMintFailed} />
    </BadgeWrapper>
  )
}
