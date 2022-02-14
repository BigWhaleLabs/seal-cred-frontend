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

const LinkTimer: FC<{ token: string }> = ({ token }) => {
  const [finished, setFinished] = useState(false)
  const deadlines = [0, 900000, 1800000, 2700000] // 0/15/30/45 minutes
  const date = new Date()
  const currentMinutes = date.getMinutes() * 60
  const currentSeconds = date.getSeconds() + currentMinutes
  const currentMilliseconds = currentSeconds * 1000 + date.getMilliseconds()
  const matchDeadline =
    deadlines.find((s: number) => s - currentMilliseconds > 0) || 3600000 // if no matches than 60 minutes is a deadline

  useEffect(() => {
    if (finished) {
      setTimeout(() => {
        PublicAccountStore.removeLinkedToken(token)
      }, 2500)
    }
  }, [finished, token])

  const renderer = ({ total, completed }: CountdownRerender) => {
    const h = Math.floor(total / 1000 / 60 / 60)
    const m = Math.floor((total / 1000 / 60 / 60 - h) * 60)
    const s = Math.floor(((total / 1000 / 60 / 60 - h) * 60 - m) * 60)

    if (completed) {
      setFinished(true)
    }
    return (
      <div>
        {m < 10 ? `0${m}` : m}:{s < 10 ? `0${s}` : s}
      </div>
    )
  }

  return token.length ? (
    <div className={timer}>
      {!finished && (
        <>
          <Countdown
            date={Date.now() + matchDeadline - currentMilliseconds}
            intervalDelay={0}
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
