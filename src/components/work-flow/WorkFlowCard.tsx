import { AccentText, BodyText, GradientSpan, HeaderText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import BadgeBlock from 'components/badges/BadgeBlock'
import BadgesOwnedForContract from 'components/badges/BadgesOwnedForContract'
import Button from 'components/Button'
import Card from 'components/Card'
import CardContainer from 'components/proofs/CardContainer'
import ConnectAccount from 'components/proofs/ConnectAccount'
import ContractsStore from 'stores/ContractsStore'
import EmailProofForm from 'components/proofs/Email/EmailProofForm'
import LoadingTitle from 'components/proofs/LoadingTitle'
import ReadyEmailProof from 'components/proofs/Email/ReadyEmailProof'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'
import classnames, { fontWeight, space, width } from 'classnames/tailwind'
import proofStore from 'stores/ProofStore'

const proofLineContainer = classnames(
  space('space-y-4'),
  fontWeight('font-normal'),
  width('w-full')
)

export default function () {
  const { account } = useSnapshot(WalletStore)
  const { emailProofsCompleted } = useSnapshot(proofStore)
  const [domain, setDomain] = useState<string | undefined>()
  const { contractsOwned } = useSnapshot(ContractsStore)
  const { emailLedger } = useSnapshot(SealCredStore)

  function onUpdateDomain({ domain }: { domain?: string }) {
    setDomain(domain)
  }

  const proof = emailProofsCompleted.find(
    (emailProof) => emailProof.domain === domain
  )

  const ledgerRecord = proof && emailLedger[proof.domain]
  const minted =
    ledgerRecord &&
    contractsOwned.includes(ledgerRecord.derivativeContract.address)

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
              <>
                <HeaderText extraLeading>
                  {minted
                    ? 'Congrats!'
                    : proof.result
                    ? 'Ready to mint!'
                    : 'Creating your zk proof'}
                </HeaderText>
                <BodyText>
                  {minted
                    ? proof.result
                      ? 'You already have a zkBadge verifying your work email! You can choose another account to mint new zkBadge!'
                      : 'You’ve minted a zkBadge verifying your work email!'
                    : proof.result
                    ? 'Mint your zkBadge below to add it to your wallet.'
                    : 'This may take a second.'}
                </BodyText>
                <ReadyEmailProof proof={proof} />
                {minted ? (
                  <>
                    <BadgesOwnedForContract
                      contractAddress={ledgerRecord?.derivativeContract.address}
                    />
                    <Button
                      fullWidth
                      center
                      small
                      type="secondary"
                      onClick={() => setDomain(undefined)}
                    >
                      <GradientSpan
                        bold
                        gradientFrom="from-secondary"
                        gradientTo="to-accent"
                      >
                        Try another email
                      </GradientSpan>
                    </Button>
                  </>
                ) : (
                  proof.result && <BadgeBlock proof={proof} />
                )}
              </>
            ) : (
              <>
                <HeaderText extraLeading>
                  {domain
                    ? 'A token has been sent to your email!'
                    : 'Zero knowledge proof for work'}
                </HeaderText>
                {!domain && (
                  <BodyText>
                    <span>
                      <AccentText color="text-accent">SealCred</AccentText>
                      <AccentText color="text-secondary">|work</AccentText>
                    </span>{' '}
                    allows you to create and add a zkBadge to your wallet that
                    proves you work somewhere without exposing your identity
                  </BodyText>
                )}
                <div className={proofLineContainer}>
                  <EmailProofForm
                    hintColor="primary"
                    onChange={onUpdateDomain}
                    onCreate={onUpdateDomain}
                  />
                </div>
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
