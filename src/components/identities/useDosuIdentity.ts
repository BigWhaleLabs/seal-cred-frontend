import * as api from 'helpers/api'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'
import Template from 'models/Template'
import Token from 'models/Token'

export default function useDosuIdentity(onAddToken: (token: Token) => void) {
  const [templates, setTemplates] = useState([] as Template[])
  const { search } = useLocation<{ token?: string; handle?: string }>()

  const query = new URLSearchParams(search)
  const dosuAuthToken = query.get('token') || ''
  const handle = query.get('handle') || ''

  useEffect(() => {
    async function fetchTemplates() {
      const fetched = await api.fetchDosuTemplates({
        token: dosuAuthToken,
        handle,
      })
      setTemplates(fetched)
    }
    if (dosuAuthToken) void fetchTemplates()
  }, [dosuAuthToken, handle, setTemplates])

  const onCreate = useCallback(
    async (type: string) => {
      const token = await api.createDosuBadge(type, {
        token: dosuAuthToken,
        handle,
      })
      onAddToken(token)
    },
    [dosuAuthToken, handle, onAddToken]
  )

  return useMemo(
    () =>
      dosuAuthToken
        ? {
            onCreate,
            handle,
            templates,
          }
        : null,
    [dosuAuthToken, templates, handle, onCreate]
  )
}
