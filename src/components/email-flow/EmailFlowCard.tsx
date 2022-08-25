import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Card from 'components/ui/Card'
import CardContainer from 'components/proofs/CardContainer'
import ConnectAccount from 'components/proofs/ConnectAccount'
import EmailFlowBadge from 'components/email-flow/EmailFlowBadge'
import EmailFlowForm from 'components/email-flow/EmailFlowForm'
import EmailFlowListProofs from 'components/email-flow/EmailFlowListProofs'
import EmailFlowProof from 'components/email-flow/EmailFlowProof'
import LoadingCard from 'components/proofs/LoadingCard'
import MintedToken from 'models/MintedToken'
import Proof from 'models/Proof'
import ProofStore from 'stores/ProofStore'
import Separator from 'components/ui/Separator'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { proofsCompleted } = useSnapshot(ProofStore['Email'])
  const { account } = useSnapshot(WalletStore)
  const [domain, setDomain] = useState('')
  const [proof, setProof] = useState<Proof | undefined>()
  const [minted, setMinted] = useState<MintedToken[] | undefined>()

  const hasProofsCompleted = proofsCompleted.length > 0
  const offerChooseCreatedProof = !domain && hasProofsCompleted

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
        paddingType="normal"
        mobileSpinnerOnRight
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
                {offerChooseCreatedProof && (
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
