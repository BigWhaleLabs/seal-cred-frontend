import { BadgeText } from 'components/Text'
import { useState } from 'preact/hooks'
import EmailForm from 'components/EmailForm'
import ProofLine from 'components/ProofLine'
import StaticArrow from 'icons/StaticArrow'
import TextForm from 'components/TextForm'
import classnames, {
  alignItems,
  backgroundClip,
  backgroundImage,
  display,
  fontWeight,
  gradientColorStops,
  justifyContent,
  space,
  textColor,
  width,
} from 'classnames/tailwind'

const arrowContainer = classnames(
  textColor('text-transparent', 'active:text-accent'),
  backgroundClip('bg-clip-text'),
  backgroundImage('bg-gradient-to-r'),
  gradientColorStops('from-secondary', 'to-accent'),
  display('flex'),
  alignItems('items-center'),
  space('space-x-2'),
  fontWeight('font-bold')
)

const workTitleContainer = classnames(
  display('flex'),
  justifyContent('justify-between'),
  width('w-full'),
  fontWeight('font-bold')
)

const proofLineContainer = classnames(
  space('space-y-2'),
  fontWeight('font-normal')
)

export default function () {
  const [open, setOpen] = useState(true)
  const [domain, setDomain] = useState('')

  function onToggle() {
    setOpen(!open)
  }

  function onSendEmail(email?: string) {
    if (email) {
      const [_, domain] = email.split('@')
      setDomain(domain)
    }
  }

  function onSendSecret(secret?: string) {
    if (secret) {
      console.log(secret)
    }
  }

  return (
    <ProofLine className={proofLineContainer}>
      <div className={workTitleContainer}>
        <span>{`Work email ${domain ? `@${domain}` : ''}`}</span>
        <button className={arrowContainer} onClick={onToggle}>
          {!open && !domain && <span>Get started</span>}
          <StaticArrow turnUp={open} />
        </button>
      </div>
      {open && (
        <>
          <BadgeText>
            Add your work email and we’ll send you a token for that email. Then,
            use the token here to create zk proof.
          </BadgeText>
          {domain ? (
            <TextForm
              submitText="Send token"
              placeholder="Paste token here"
              onSubmit={onSendSecret}
            />
          ) : (
            <EmailForm
              submitText="Submit email"
              placeholder="Work email..."
              onSubmit={onSendEmail}
            />
          )}
        </>
      )}
    </ProofLine>
  )
}
