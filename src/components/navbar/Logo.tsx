import SealWallet from 'icons/SealWallet'
import SmallSeal from 'icons/SmallSeal'

export default function ({ connected }: { connected: boolean }) {
  return (
    <>
      <SmallSeal connected={connected} />
      <SealWallet connected={connected} />
    </>
  )
}
