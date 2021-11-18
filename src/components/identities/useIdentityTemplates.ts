import * as api from 'helpers/api'
import { Identities } from 'components/Identity'
import { useEffect, useMemo, useState } from 'react'
import Template from 'models/Template'

export default function useIdentityTemplates(identity?: Identities) {
  const [templates, setTemplates] = useState([] as Template[])

  useEffect(() => {
    async function fetchTemplates() {
      const fetched = await api.fetchTemplates({ identity })
      setTemplates(fetched)
    }
    void fetchTemplates()
  }, [identity, setTemplates])

  return useMemo(() => new Map(templates.map((t) => [t.type, t])), [templates])
}
