import { useState } from 'preact/hooks'
import TextForm from 'components/ui/TextForm'
import data from 'data'
import proofStore from 'stores/ProofStore'

export default function ({
  submitType = 'secondary',
  error,
  onError,
}: {
  submitType?: 'primary' | 'secondary' | 'tertiary'
  error: string | undefined
  onError: (error: string | undefined) => void
}) {
  const [loading, setLoading] = useState(false)

  async function onGenerateProof(username: string) {
    if (!username) return onError("Looks like you didn't enter an username.")

    setLoading(true)
    onError(undefined)
    try {
      await data['Farcaster'].createProof(
        proofStore['Farcaster'],
        'farcaster',
        { username }
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <TextForm
        submitType={submitType}
        submitText="Generate proof"
        placeholder="Enter farcaster username"
        onSubmit={onGenerateProof}
        loading={loading}
        error={error}
      />
    </>
  )
}
