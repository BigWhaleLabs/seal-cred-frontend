import ListTitle from 'components/proofs/ListTitle'
import ProofList from 'components/proofs/ProofList'
import useUrlParams from 'hooks/useUrlParams'

export default function () {
  const { urlDomain, urlToken } = useUrlParams()

  return (
    <>
      <ListTitle />
      <ProofList selectedCategory={urlDomain && urlToken ? 'Email' : 'NFTs'} />
    </>
  )
}
