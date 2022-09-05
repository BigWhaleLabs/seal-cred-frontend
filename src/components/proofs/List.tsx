import { CategoriesTitles, categories } from 'models/Categories'
import { useParams } from 'react-router-dom'
import ListTitle from 'components/proofs/ListTitle'
import ProofList from 'components/proofs/ProofList'

export default function () {
  const params = useParams()
  const urlCategory = params?.category
  const currentCategory =
    urlCategory &&
    Object.keys(categories).find((category) => category === urlCategory)
      ? urlCategory
      : Object.keys(categories)[0]

  return (
    <>
      <ListTitle />
      <ProofList selectedCategory={currentCategory as CategoriesTitles} />
    </>
  )
}
