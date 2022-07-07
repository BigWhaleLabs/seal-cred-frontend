import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Card from 'components/Card'
import CardContainer from 'components/proofs/CardContainer'
import ConnectAccount from 'components/proofs/ConnectAccount'
import EmailFlowBadge from 'components/email-flow/EmailFlowBadge'
import EmailFlowForm from 'components/email-flow/EmailFlowForm'
import EmailFlowListProofs from 'components/email-flow/EmailFlowListProofs'
import EmailFlowProof from 'components/email-flow/EmailFlowProof'
import EmailProof from 'helpers/EmailProof'
import LoadingCard from 'components/proofs/LoadingCard'
import MintedToken from 'models/MintedToken'
import ProofStore from 'stores/ProofStore'
import Separator from 'components/Separator'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { emailProofsCompleted } = useSnapshot(ProofStore)
  const { account } = useSnapshot(WalletStore)
  const [domain, setDomain] = useState('')
  const [proof, setProof] = useState<EmailProof | undefined>()
  const [minted, setMinted] = useState<MintedToken[] | undefined>()
  const hasProofsCompleted = emailProofsCompleted.length > 0

  function onMinted(minted?: MintedToken[]) {
    if (minted) setMinted(minted)
    setProof(undefined)
    setDomain('')
  }

  function onReset() {
    setMinted(undefined)
    setProof(undefined)
    setDomain('')
  }

  return (
    <CardContainer>
      <Card
        color="accent"
        shadow
        onlyWrap
        spinner="Work hard, play hard, whistleblow hard"
      >
        {account ? (
          <Suspense fallback={<LoadingCard />}>
            {minted ? (
              <EmailFlowBadge minted={minted} resetEmail={onReset} />
            ) : proof ? (
              <EmailFlowProof
                onMinted={onMinted}
                onMintFailed={onReset}
                proof={proof}
              />
            ) : (
              <>
                <EmailFlowForm
                  domain={domain}
                  onUpdateDomain={setDomain}
                  onSelectProof={setProof}
                />
                {!domain && hasProofsCompleted && (
                  <>
                    <Separator>OR</Separator>
                    <EmailFlowListProofs onSelectProof={setProof} />
                  </>
                )}
              </>
            )}
          </Suspense>
        ) : (
          <ConnectAccount />
        )}
      </Card>
    </CardContainer>
  )
}
