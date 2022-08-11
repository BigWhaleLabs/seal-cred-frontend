import { useEffect } from 'react'
import { useLocation } from 'react-router'
import ChildrenProp from 'models/ChildrenProp'

export default ({ children }: ChildrenProp) => {
  const location = useLocation()
  useEffect(() => {
    const linksNeedsToScroll = ['/', '/terms', '/privacy']
    if (linksNeedsToScroll.includes(location.pathname))
      window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location])

  return <>{children}</>
}
