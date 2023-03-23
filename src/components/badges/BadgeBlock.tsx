import { BadgeBlockProps } from 'models/BadgeBlockProps'
import { BadgesContractsStore } from 'stores/ContractsStore'
import { handleError } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import BadgeCard from 'components/badges/BadgeCard'
import BadgeTitle from 'components/badges/BadgeTitle'
import BadgeWrapper from 'components/badges/BadgeWrapper'
import Button from 'components/ui/Button'
import LinkedWalletWarning from 'components/ui/LinkedWalletWarning'
import ProofStore from 'stores/ProofStore'
import WalletStore from 'stores/WalletStore'
import badgeConfig from 'badgeConfig'
import catchUnhandledRejection from 'hooks/catchUnhandledRejection'
import data from 'data'
import useOwnedAddresses from 'hooks/useOwnedAddresses'

function Badge({ onMintFailed, onMinted, proof }: BadgeBlockProps) {
  const { account, mintLoading } = useSnapshot(WalletStore)
  const [loading, setLoading] = useState(false)
  const originals = useOwnedAddresses(data[proof.badgeType].network)
  catchUnhandledRejection((error: unknown) => {
    if (onMintFailed) onMintFailed()
    handleError(error)
    setLoading(false)
    WalletStore.mintLoading = false
  })

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
      text={<BadgeTitle originalOrAddress={proof.original} />}
      top={<ProofIcon />}
      bottom={
        <>
          <Button
            small
            disabled={!proof || mintLoading}
            loading={loading}
            type="primary"
            onClick={checkProofAndMint}
          >
            {proof ? 'Mint badge' : 'Minted!'}
          </Button>
          {originals.includes(proof.original) && <LinkedWalletWarning />}
        </>
      }
    />
  )
}

export default function ({ onMintFailed, onMinted, proof }: BadgeBlockProps) {
  return (
    <BadgeWrapper minted={false}>
      <Badge proof={proof} onMintFailed={onMintFailed} onMinted={onMinted} />
    </BadgeWrapper>
  )
}
