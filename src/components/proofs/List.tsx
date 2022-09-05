import { useEffect } from 'preact/hooks'
import EmailDomainStore from 'stores/EmailDomainStore'
import ListTitle from 'components/proofs/ListTitle'
import ProofList from 'components/proofs/ProofList'
import useUrlParams from 'hooks/useUrlParams'

export default function () {
  const params = useUrlParams()
  const currentCategory = !!params && params?.token ? 'Email' : 'NFTs'

  useEffect(() => {
    if (params) {
      EmailDomainStore.emailDomain = params.domain
      EmailDomainStore.hasToken = !!params
    }
  }, [params])

  return (
    <>
      <ListTitle />
      <ProofList selectedCategory={currentCategory} />
    </>
  )
}
