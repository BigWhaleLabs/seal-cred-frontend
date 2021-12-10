import { FC } from 'react'
import { HeaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { observer } from 'mobx-react-lite'
import { useMetaMask } from 'metamask-react'
import BadgeList from 'components/BadgeList'
import CardBlock from 'components/CardBlock'
import DosuIdentity from 'components/identities/DosuIdentity'
import EthIdentity from 'components/identities/EthIdentity'
import EthereumBlock from 'components/EthereumBlock'
import GridLayout from 'components/GridLayout'
import SocialCard from 'components/identities/SocialCard'
import useTokens from 'helpers/useTokens'

const Home: FC = () => {
  const { account } = useMetaMask()
  const address = account || '0x0000000000000000000000000000000000000000'
  const tokens = useTokens(address)

  return (
    <>
      <div className={classnames('py-5')}>
        <CardBlock border shadow main>
          <HeaderText>One identity to rule them all</HeaderText>
          <EthereumBlock address={address} owner />
          <BadgeList tokens={tokens} />
        </CardBlock>
      </div>
      <div className={classnames('pt-5', 'md:pt-9')}>
        <GridLayout>
          <SocialCard />
          <DosuIdentity tokens={tokens} />
          <EthIdentity tokens={tokens} />
        </GridLayout>
      </div>
    </>
  )
}

export default observer(Home)
