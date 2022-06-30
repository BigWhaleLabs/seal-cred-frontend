import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Card from 'components/Card'
import CardContainer from 'components/proofs/CardContainer'
import ConnectAccount from 'components/proofs/ConnectAccount'
import EmailFlowProof from 'components/email-flow/EmailFlowProof'
import LoadingTitle from 'components/proofs/LoadingTitle'
import WalletStore from 'stores/WalletStore'

import EmailFlowForm from 'components/email-flow/EmailFlowForm'
import proofStore from 'stores/ProofStore'

export default function () {
  const { account } = useSnapshot(WalletStore)
  const { emailProofsCompleted } = useSnapshot(proofStore)
  const [domain, setDomain] = useState<string | undefined>()

  function onUpdateDomain({ domain }: { domain?: string }) {
    setDomain(domain)
  }

  const proof = emailProofsCompleted.find(
    (emailProof) => emailProof.domain === domain
  )

  return (
    <CardContainer>
      <Card
        color="accent"
        shadow
        onlyWrap
        spinner="Work hard, play hard, whistleblow hard"
      >
        {account ? (
          <Suspense fallback={<LoadingTitle />}>
            {proof ? (
              <EmailFlowProof
                proof={proof}
                resetEmail={() => setDomain(undefined)}
              />
            ) : (
              <EmailFlowForm domain={domain} onUpdateDomain={onUpdateDomain} />
            )}
          </Suspense>
        ) : (
          <ConnectAccount />
        )}
      </Card>
    </CardContainer>
  )
}
