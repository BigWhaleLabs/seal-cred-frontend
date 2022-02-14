import { FC, useEffect, useState } from 'react'
import { classnames, display, flexDirection, space } from 'classnames/tailwind'
import Countdown from 'react-countdown'
import PublicAccountStore from 'stores/PublicAccountStore'

type CountdownRerender = {
  total: number
  completed: boolean
}

const timer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('!space-x-1')
)

const LinkTimer: FC<{
  token: {
    identityType: string
    updatedAt: number
  }
}> = ({ token }) => {
  const [finished, setFinished] = useState(false)
  const date = new Date(token.updatedAt)
  const currentMinutes = date.getMinutes() * 60
  const currentSeconds = date.getSeconds() + currentMinutes
  const currentMilliseconds = currentSeconds * 1000 + date.getMilliseconds()
  const matchDeadline =
    [0, 900_000, 1_800_000, 2_700_000].find(
      (s: number) => s - currentMilliseconds > 0
    ) || 3600000 // 0/15/30/45/60 minutes

  useEffect(() => {
    if (finished) {
      setTimeout(() => {
        PublicAccountStore.removeLinkedToken(token.identityType)
      }, 2500)
    }
  }, [finished, token])

  const renderer = ({ total, completed }: CountdownRerender) => {
    const m = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
    const s = Math.floor((total % (1000 * 60)) / 1000)

    if (completed) {
      setFinished(true)
    }
    return (
      <div>
        {m < 10 ? `0${m}` : m}:{s < 10 ? `0${s}` : s}
      </div>
    )
  }

  return token ? (
    <div className={timer}>
      {!finished && (
        <>
          <Countdown
            key={token.identityType}
            date={token.updatedAt + matchDeadline - currentMilliseconds}
            renderer={renderer}
          />
          <div>before update</div>
        </>
      )}
      {finished && <div>The contract was updated!</div>}
    </div>
  ) : null
}

export default LinkTimer
