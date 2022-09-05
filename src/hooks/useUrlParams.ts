import { useSearchParams } from 'react-router-dom'

export default function () {
  const [searchParams] = useSearchParams()

  const domain = searchParams.get('domain') ?? ''
  const token = searchParams.get('token') ?? ''

  if (!domain.length || !token.length) return

  return { domain, token }
}
