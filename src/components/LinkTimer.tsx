import { FC, useEffect, useState } from 'react'
import { classnames, display, flexDirection, space } from 'classnames/tailwind'
import Countdown from 'react-countdown'
import PublicAccountStore from 'stores/PublicAccountStore'

type CountdownRerender = {
  minutes: number
  seconds: number
  completed: boolean
}

const timer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('!space-x-1')
)

const LinkTimer: FC<{ token: string }> = ({ token }) => {
  const [finished, setFinished] = useState(false)
  const deadlines = [0, 900, 1800, 2700]
  const currentMinutes = new Date().getMinutes() * 60
  const currentSeconds = new Date().getSeconds() + currentMinutes
  const matchDeadline =
    deadlines.find((s: number) => s - currentSeconds > 0) || 3600

  useEffect(() => {
    if (finished) {
      setTimeout(() => {
        PublicAccountStore.removeLinkedToken(token)
      }, 2500)
    }
  }, [finished, token])

  const renderer = ({ minutes, seconds, completed }: CountdownRerender) => {
    if (completed) {
      setFinished(true)
    }
    return (
      <div>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
    )
  }

  return token.length ? (
    <div className={timer}>
      {!finished && (
        <>
          <Countdown
            date={Date.now() + (matchDeadline - currentSeconds) * 1000}
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
