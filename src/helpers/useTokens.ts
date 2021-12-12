import * as api from 'helpers/api'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Token from 'models/Token'

export default function useTokens(address?: string) {
  const [tokens, setTokens] = useState([] as Token[])

  useEffect(() => {
    async function fetchTokens(address: string) {
      const fetched = await api.fetchTokens(address)
      setTokens(fetched)
    }
    if (address) {
      void fetchTokens(address)
    }
  }, [address, setTokens])

  const addToken = useCallback(
    (token) => {
      setTokens([...tokens, token])
    },
    [tokens]
  )

  return useMemo(
    () => ({
      tokens,
      addToken,
      setTokens,
    }),
    [tokens, addToken]
  )
}
