import { FC } from 'react'
import { HeaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { observer } from 'mobx-react-lite'
import BadgeList from 'components/BadgeList'
import CardBlock from 'components/CardBlock'
import EthereumBlock from 'components/EthereumBlock'
import GridLayout from 'components/GridLayout'
import LinkedinIdentity from 'components/identities/LinkedinIdentity'
import MetaMask from 'components/MetaMask'
import SocialCard from 'components/SocialCard'
import TwitterIdentity from 'components/identities/TwitterIdentity'
import UserStore from 'stores/UserStore'
import useTokens from 'helpers/useTokens'

const Home: FC = () => {
  const address = UserStore.ethaddress
  const tokens = useTokens(address)

  return (
    <>
      <div className={classnames('py-5')}>
        <CardBlock border shadow main>
          <HeaderText>One identity to rule them all</HeaderText>
          {address ? (
            <>
              <EthereumBlock address={address} owner />
              <BadgeList tokens={tokens} />
            </>
          ) : (
            <MetaMask />
          )}
        </CardBlock>
      </div>
      <div className={classnames('pt-5', 'md:pt-9')}>
        <GridLayout>
          <SocialCard />
          <TwitterIdentity tokens={tokens} />
          <LinkedinIdentity tokens={tokens} />
        </GridLayout>
      </div>
    </>
  )
}

export default observer(Home)
