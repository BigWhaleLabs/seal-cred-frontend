import { TextButton } from 'components/ui/Text'
import { useSnapshot } from 'valtio'
import EmailDomainStore from 'stores/EmailDomainStore'
import EmailFormStore from 'stores/EmailFormStore'
import UploadEmailListButton from 'components/ui/UploadEmailListButton'

export default function ({
  jumpToToken,
  forFlow,
}: {
  jumpToToken: () => void
  forFlow?: boolean
}) {
  const { loading } = useSnapshot(EmailFormStore)
  const { emailDomain } = useSnapshot(EmailDomainStore)

  return (
    <>
      {forFlow ? (
        `Start by entering your email and at least 10 others (but the more
              you add, like 100+, will improve your anonymity). We’ll then send
              you an email containing a token. You’ll come back here and enter
              your token to receive your zk badge.{' '}`
      ) : (
        <>
          To create a zk proof, add your email. Then add at least 10 or even
          100+ other emails with the same domain to increase your anonymity.{' '}
          <UploadEmailListButton
            title="You can upload an email list (txt, csv, etc...)"
            disabled={loading}
          />
          <br />
          <br />
          We’ll then send you a token to use here for a zk proof.{' '}
        </>
      )}
      {!!emailDomain && (
        <TextButton
          onClick={() => !loading && jumpToToken()}
          disabled={loading}
        >
          Have an existing token?
        </TextButton>
      )}
    </>
  )
}
