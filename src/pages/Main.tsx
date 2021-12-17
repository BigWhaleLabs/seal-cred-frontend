import Identities from 'components/Identities'
import PublicAddress from 'components/PublicAddress'
import useAddress from 'hooks/useAddress'

export default function Main() {
  const address = useAddress()

  return (
    <>
      <PublicAddress />
      {!address && <Identities />}
    </>
  )
}
