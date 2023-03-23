import { useSearchParams } from 'react-router-dom'

export default function () {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlDomain = searchParams.get('domain') ?? ''
  const urlToken = searchParams.get('token') ?? ''

  const clearSearchParams = () => setSearchParams('')

  return { clearSearchParams, urlDomain, urlToken }
}
