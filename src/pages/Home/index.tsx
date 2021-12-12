import { FC, useEffect, useMemo, useState } from 'react'
import { HeaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { observer } from 'mobx-react-lite'
import BadgeList from 'components/BadgeList'
import CardBlock from 'components/CardBlock'
import DosuIdentity from 'components/identities/DosuIdentity'
import DosuLink from 'components/identities/DosuLink'
import EthIdentity from 'components/identities/EthIdentity'
import EthereumBlock from 'components/EthereumBlock'
import GridLayout from 'components/GridLayout'
import SocialCard from 'components/identities/SocialCard'
import UserStore from 'stores/UserStore'
import useTokens from 'helpers/useTokens'

function useGeneratedAddress() {
  const [account, setAccount] = useState<string | undefined>()

  useEffect(() => {
    async function init() {
      let wallet = UserStore.wallet
      if (!wallet) {
        wallet = await UserStore.createWallet()
      }
      if (!UserStore.token) {
        await UserStore.connect(wallet)
      }
      setAccount(wallet.address)
    }
    void init()
  }, [account])

  return useMemo(() => account, [account])
}

const Home: FC = () => {
  const address = useGeneratedAddress()
  const { tokens, addToken } = useTokens(address)

  if (!address) return null

  return (
    <>
      <div className={classnames('py-5')}>
        <CardBlock border shadow main>
          <HeaderText>One identity to rule them all</HeaderText>
          <EthereumBlock address={address} owner />
          <BadgeList tokens={tokens} />
          <DosuLink tokens={tokens} />
        </CardBlock>
      </div>
      <div className={classnames('pt-5', 'md:pt-9')}>
        <GridLayout>
          <SocialCard />
          <DosuIdentity tokens={tokens} onAddToken={addToken} />
          <EthIdentity tokens={tokens} onAddToken={addToken} />
        </GridLayout>
      </div>
    </>
  )
}

export default observer(Home)
