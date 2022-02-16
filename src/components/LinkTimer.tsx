import { BodyText } from 'components/Text'
import { FC, useEffect, useState } from 'react'
import { classnames, display, flexDirection, space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import PublicAccountStore from 'stores/PublicAccountStore'
import TimerStore from 'stores/TimerStore'
import dayjs from 'dayjs'

const timer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('!space-x-1')
)

const LinkTimer: FC<{
  token: string
}> = ({ token }) => {
  const { timerLeft } = useSnapshot(TimerStore, { sync: true })
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (!timerLeft) {
      setFinished(true)
    }
  }, [timerLeft])

  useEffect(() => {
    if (finished) {
      setTimeout(() => {
        setFinished(false)
        PublicAccountStore.removeLinkedToken(token)
      }, 2500)
    }
  }, [finished, token])

  return token.length ? (
    <div className={timer}>
      {timerLeft && (
        <BodyText>{dayjs(timerLeft).format('mm:ss')} before update</BodyText>
      )}
      {!timerLeft && <BodyText>The contract was updated!</BodyText>}
    </div>
  ) : null
}

export default LinkTimer
