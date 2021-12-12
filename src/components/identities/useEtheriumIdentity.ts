import * as api from 'helpers/api'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMetaMask } from 'metamask-react'
import Template from 'models/Template'
import Token from 'models/Token'

export default function useEtheriumIdentity(
  onAddToken: (token: Token) => void
) {
  const { account: address } = useMetaMask()
  const [templates, setTemplates] = useState([] as Template[])

  useEffect(() => {
    async function fetchTemplates(address: string) {
      const fetched = await api.fetchEtheriumTemplates({ address })
      setTemplates(fetched)
    }
    if (address) void fetchTemplates(address)
  }, [address, setTemplates])

  const onCreate = useCallback(
    async (type: string) => {
      if (address) {
        const token = await api.createEtheriumBadge(type, address)
        onAddToken(token)
      }
    },
    [address, onAddToken]
  )

  return useMemo(
    () =>
      address
        ? {
            address,
            onCreate,
            templates,
          }
        : null,
    [address, onCreate, templates]
  )
}
