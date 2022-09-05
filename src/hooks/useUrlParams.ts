import { useLocation } from 'react-router-dom'

export default function () {
  const { search } = useLocation()

  if (!search.length) return

  const regExDomain = /domain=(.*)&/
  const regExToken = /token=(.*)/

  const matchDomain = search.match(regExDomain)
  const matchToken = search.match(regExToken)

  if (!matchDomain || !matchToken) return
  if (!matchDomain[1] || !matchToken[1]) return

  return { domain: matchDomain[1], token: matchToken[1] }
}
