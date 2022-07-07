import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Card from 'components/Card'
import CardContainer from 'components/proofs/CardContainer'
import ConnectAccount from 'components/proofs/ConnectAccount'
import EmailFlowBadge from 'components/email-flow/EmailFlowBadge'
import EmailFlowForm from 'components/email-flow/EmailFlowForm'
import EmailFlowProof from 'components/email-flow/EmailFlowProof'
import EmailProof from 'helpers/EmailProof'
import LoadingCard from 'components/proofs/LoadingCard'
import MintedToken from 'models/MintedToken'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { account } = useSnapshot(WalletStore)
  const [domain, setDomain] = useState('')
  const [proof, setProof] = useState<EmailProof | undefined>()
  const [minted, setMinted] = useState<MintedToken[] | undefined>()

  function onMint(minted?: MintedToken[]) {
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
                onMint={onMint}
                onMintFailed={onReset}
                proof={proof}
              />
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
