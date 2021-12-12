import { FC } from 'react'
import { HeaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import CardBlock from 'components/CardBlock'
import EthereumBlock from 'components/EthereumBlock'
import GridLayout from 'components/GridLayout'
import PublicAccountStore from 'stores/PublicAccountStore'
import SocialCard from 'components/identities/SocialCard'

const Home: FC = () => {
  const publicAccountStoreSnapshot = useSnapshot(PublicAccountStore)
  return (
    <>
      <div className={classnames('py-5')}>
        <CardBlock border shadow main>
          <HeaderText>One identity to rule them all</HeaderText>
          <EthereumBlock
            address={publicAccountStoreSnapshot.mainEthWallet.address}
            owner
          />
        </CardBlock>
      </div>
      <div className={classnames('pt-5', 'md:pt-9')}>
        <GridLayout>
          <SocialCard />
        </GridLayout>
      </div>
    </>
  )
}

export default Home
