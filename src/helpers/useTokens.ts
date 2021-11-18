import * as api from 'helpers/api'
import { useEffect, useMemo, useState } from 'react'
import Token from 'models/Token'

export default function useTokens() {
  const [address, setAddress] = useState(localStorage.getItem('eth') || '')
  const [tokens, setTokens] = useState([] as Token[])

  useEffect(() => {
    window.addEventListener('storage', () => {
      setAddress(JSON.parse(localStorage.getItem('eth') || '') || [])
    })
  }, [])

  useEffect(() => {
    async function fetchTokens() {
      const fetched = await api.fetchTokens(address)
      setTokens(fetched)
    }
    if (address) {
      void fetchTokens()
    }
  }, [address, setTokens])

  return useMemo(() => tokens, [tokens])
}
