import { HeaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { configure } from 'mobx'
import BadgeList from 'components/BadgeList'
import CardBlock from 'components/CardBlock'
import EthereumBlock from 'components/EthereumBlock'
import GridLayout from 'components/GridLayout'
import IntlProvider from 'i18n/IntlProvider'
import LinkedinIdentity from 'components/identities/LinkedinIdentity'
import Navbar from 'components/Navbar'
import Root from 'components/Root'
import SocialCard from 'components/SocialCard'
import ThemeProvider from 'components/ThemeProvider'
import TwitterIdentity from 'components/identities/TwitterIdentity'
import useTokens from 'helpers/useTokens'

configure({
  enforceActions: 'never',
})

const App = () => {
  const tokens = useTokens('0xdDd0bacA576a3a6710806245a834d719e458D614')
  return (
    <ThemeProvider>
      <Root>
        <IntlProvider>
          <Navbar />
          <div className={classnames('py-5')}>
            <CardBlock border shadow main>
              <HeaderText>One identity to rule them all</HeaderText>
              <EthereumBlock />
              <BadgeList />
            </CardBlock>
          </div>
          <div className={classnames('pt-5', 'md:pt-9')}>
            <GridLayout>
              <SocialCard />
              <TwitterIdentity tokens={tokens} />
              <LinkedinIdentity tokens={tokens} />
            </GridLayout>
          </div>
        </IntlProvider>
      </Root>
    </ThemeProvider>
  )
}

export default App
