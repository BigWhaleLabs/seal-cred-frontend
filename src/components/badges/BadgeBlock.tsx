import { useSnapshot } from 'valtio'
import { useState } from 'react'
import BadgeCard from 'components/badges/BadgeCard'
import BadgeIcon from 'icons/BadgeIcon'
import BadgeWrapper from 'components/badges/BadgeWrapper'
import BaseProof from 'helpers/BaseProof'
import Button from 'components/Button'
import ContractName from 'components/ContractName'
import ERC721Proof from 'helpers/ERC721Proof'
import EmailProof from 'helpers/EmailProof'
import ExternalLink from 'components/ExternalLink'
import ProofStore from 'stores/ProofStore'
import WalletStore from 'stores/WalletStore'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import handleError from 'helpers/handleError'
import useDerivativeAddress from 'hooks/useDerivativeAddress'

function Badge({ proof }: { proof: BaseProof }) {
  const { proofsCompleted } = useSnapshot(ProofStore)
  const derivativeAddress = useDerivativeAddress(proof)
  const { account } = useSnapshot(WalletStore)
  const [loading, setLoading] = useState(false)

  const checkProofAndMint = async () => {
    setLoading(true)

    try {
      if (!account) throw new Error('No account found')
      if (!proof?.result) throw new Error('No proof found')

      await WalletStore.mintDerivative(proof)

      ProofStore.proofsCompleted = proofsCompleted.filter((p) => p === proof)
    } catch (error) {
      if (
        proof &&
        error instanceof Error &&
        error.message.includes('This ZK proof has already been used')
      ) {
        ProofStore.proofsCompleted = proofsCompleted.filter((p) => p === proof)
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
      top={<BadgeIcon />}
      leanLeft={false}
      text={
        derivativeAddress ? (
          <ExternalLink url={getEtherscanAddressUrl(derivativeAddress)}>
            <ContractName address={derivativeAddress} />
          </ExternalLink>
        ) : (
          <>
            {proof instanceof ERC721Proof ? (
              <ContractName address={proof.contract} />
            ) : proof instanceof EmailProof ? (
              proof.domain
            ) : (
              'Unknown'
            )}{' '}
            (derivative)
          </>
        )
      }
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
