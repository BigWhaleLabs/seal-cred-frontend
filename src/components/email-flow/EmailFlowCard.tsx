import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Card from 'components/ui/Card'
import CardContainer from 'components/proofs/CardContainer'
import ConnectAccount from 'components/proofs/ConnectAccount'
import EmailFlowForm from 'components/email-flow/EmailFlowForm'
import EmailFlowListProofs from 'components/email-flow/EmailFlowListProofs'
import EmailFlowProof from 'components/email-flow/EmailFlowProof'
import LoadingCard from 'components/proofs/LoadingCard'
import Proof from 'models/Proof'
import ProofStore from 'stores/ProofStore'
import Separator from 'components/ui/Separator'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { proofsCompleted } = useSnapshot(ProofStore['Email'])
  const { account } = useSnapshot(WalletStore)
  const [domain, setDomain] = useState('')
  const [proof, setProof] = useState<Proof | undefined>()

  const hasProofsCompleted = proofsCompleted.length > 0
  const offerChooseCreatedProof = !domain && hasProofsCompleted

  function onReset() {
    setProof(undefined)
    setDomain('')
  }

  return (
    <CardContainer>
      <Card
        onlyWrap
        shadow
        color="accent"
        paddingType="normal"
        spinner={{ text: 'Work hard, play hard, whistleblow hard' }}
      >
        {account ? (
          <Suspense fallback={<LoadingCard />}>
            {proof ? (
              <EmailFlowProof proof={proof} onReset={onReset} />
            ) : (
              <>
                <EmailFlowForm
                  domain={domain}
                  onSelectProof={setProof}
                  onUpdateDomain={setDomain}
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
