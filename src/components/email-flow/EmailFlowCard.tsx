import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Card from 'components/Card'
import CardContainer from 'components/proofs/CardContainer'
import ConnectAccount from 'components/proofs/ConnectAccount'
import ContractsStore from 'stores/ContractsStore'
import EmailFlowBadge from 'components/email-flow/EmailFlowBadge'
import EmailFlowForm from 'components/email-flow/EmailFlowForm'
import EmailFlowProof from 'components/email-flow/EmailFlowProof'
import EmailProof from 'helpers/EmailProof'
import LoadingCard from 'components/proofs/LoadingCard'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { contractsOwned } = useSnapshot(ContractsStore)
  const { emailLedger } = useSnapshot(SealCredStore)
  const { account } = useSnapshot(WalletStore)
  const [domain, setDomain] = useState('')
  const [proof, setProof] = useState<EmailProof | undefined>()

  const ledgerRecord = domain && emailLedger[domain]
  const minted =
    ledgerRecord && contractsOwned.includes(ledgerRecord.derivativeContract)

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
            {minted && !domain ? (
              <EmailFlowBadge
                contractAddress={ledgerRecord.derivativeContract}
                resetEmail={() => setDomain('')}
              />
            ) : proof ? (
              <EmailFlowProof proof={proof} />
            ) : (
              <EmailFlowForm
                domain={domain}
                onUpdateDomain={setDomain}
                onSelectProof={setProof}
              />
            )}
          </Suspense>
        ) : (
          <ConnectAccount />
        )}
      </Card>
    </CardContainer>
  )
}
