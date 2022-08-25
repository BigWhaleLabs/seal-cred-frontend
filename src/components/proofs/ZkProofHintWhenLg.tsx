import CardSeparator from 'components/ui/CardSeparator'
import ZkProofHint from 'components/proofs/ZkProofHint'
import useBreakpoints from 'hooks/useBreakpoints'

export default function () {
  const { lg } = useBreakpoints()
  return lg ? (
    <>
      <CardSeparator
        numberOfLines={1}
        gradient="accent-to-transparent"
        vertical
      />
      <ZkProofHint />
    </>
  ) : null
}
