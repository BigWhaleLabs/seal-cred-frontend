import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Card from 'components/Card'
import CardContainer from 'components/proofs/CardContainer'
import ConnectAccount from 'components/proofs/ConnectAccount'
import EmailFlowBadge from 'components/email-flow/EmailFlowBadge'
import EmailFlowForm from 'components/email-flow/EmailFlowForm'
import EmailFlowProof from 'components/email-flow/EmailFlowProof'
import LoadingCard from 'components/proofs/LoadingCard'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'
import proofStore from 'stores/ProofStore'

export default function () {
  const { emailLedger } = useSnapshot(SealCredStore)
  const { account } = useSnapshot(WalletStore)
  const { emailProofsCompleted } = useSnapshot(proofStore)
  const [domain, setDomain] = useState<string | undefined>()
  const ledgerRecord = domain && emailLedger[domain]

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
          <Suspense fallback={<LoadingCard />}>
            {ledgerRecord ? (
              <EmailFlowBadge
                contractAddress={ledgerRecord.derivativeContract}
                resetEmail={() => setDomain(undefined)}
              />
            ) : proof ? (
              <EmailFlowProof proof={proof} />
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
