import { useEffect } from 'react'
import Identities from 'components/Identities'
import PublicAddress from 'components/PublicAddress'
import TimerStore from 'stores/TimerStore'
import useAddress from 'hooks/useAddress'

export default function Main() {
  const address = useAddress()

  useEffect(() => {
    if (TimerStore.timerFinished) {
      TimerStore.setTimer()
    }
  }, [])
  return (
    <>
      <PublicAddress />
      {!address && <Identities />}
    </>
  )
}
