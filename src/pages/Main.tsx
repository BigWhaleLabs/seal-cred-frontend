// import { classnames } from 'classnames/tailwind'
// import GridLayout from 'components/GridLayout'
import { useParams } from 'react-router-dom'
import PublicAddress from 'components/PublicAddress'
// import SocialCard from 'components/identities/SocialCard'

export default function Main() {
  return (
    <>
      <PublicAddress />
      {/* <div className={classnames('pt-5', 'md:pt-9')}>
        <GridLayout>
          <SocialCard />
        </GridLayout>
      </div> */}
    </>
  )
}
