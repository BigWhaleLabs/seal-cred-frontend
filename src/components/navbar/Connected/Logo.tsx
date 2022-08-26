import { displayFromSm, displayFromXsToSm } from 'helpers/visibilityClassnames'
import SealWallet from 'icons/SealWallet'
import SmallSeal from 'icons/SmallSeal'

export default function () {
  return (
    <>
      <span className={displayFromXsToSm}>
        <SmallSeal connected={true} />
      </span>
      <span className={displayFromSm}>
        <SealWallet connected={true} />
      </span>
    </>
  )
}
