import Identities from 'components/Identities'
import PublicAddress from 'components/PublicAddress'
import SafariAttention from 'components/SafariAttention'
import isSafari from 'helpers/isSafari'

export default function Main() {
  return (
    <>
      <PublicAddress />
      <Identities />
      {isSafari && <SafariAttention />}
    </>
  )
}
