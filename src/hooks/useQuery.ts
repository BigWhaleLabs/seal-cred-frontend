import { useLocation } from 'react-router-dom'
import React from 'react'

export default function useQuery() {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}
