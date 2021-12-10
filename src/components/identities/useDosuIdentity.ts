import * as api from 'helpers/api'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'
import Template from 'models/Template'

export default function useDosuIdentity() {
  const [templates, setTemplates] = useState([] as Template[])
  const { search } = useLocation<{ token?: string; handle?: string }>()

  const query = new URLSearchParams(search)
  const token = query.get('token') || ''
  const handle = query.get('handle') || ''

  useEffect(() => {
    async function fetchTemplates() {
      const fetched = await api.fetchDosuTemplates({ token, handle })
      setTemplates(fetched)
    }
    if (token) void fetchTemplates()
  }, [token, handle, setTemplates])

  const onCreate = useCallback(
    (type: string) => {
      void api.createDosuBadge(type, { token, handle })
    },
    [token, handle]
  )

  return useMemo(
    () =>
      token
        ? {
            onCreate,
            handle,
            templates,
          }
        : null,
    [token, templates, handle, onCreate]
  )
}
