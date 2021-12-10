import * as api from 'helpers/api'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMetaMask } from 'metamask-react'
import Template from 'models/Template'

export default function useEtheriumIdentity() {
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
    (type: string) => {
      if (address) void api.createEtheriumBadge(type, address)
    },
    [address]
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
