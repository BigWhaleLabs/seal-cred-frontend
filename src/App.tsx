import { Group, Section } from 'components/Section'
import {
  HeaderText,
  RegularText,
  SecondarySubheaderText,
} from 'components/Text'
import { Identities } from 'components/Identity'
import { classnames } from 'classnames/tailwind'
import { configure } from 'mobx'
import BadgeList from 'components/BadgeList'
import Button, { ButtonType } from 'components/Button'
import CardBlock from 'components/CardBlock'
import EthereumBlock from 'components/EthereumBlock'
import GridLayout from 'components/GridLayout'
import IntlProvider from 'i18n/IntlProvider'
import MetaMask from 'components/MetaMask'
import Navbar from 'components/Navbar'
import Root from 'components/Root'
import SocialCard from 'components/SocialCard'
import ThemeProvider from 'components/ThemeProvider'

configure({
  enforceActions: 'never',
})

const App = () => {
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
              <div className={classnames('py-5')}>
                <MetaMask />
              </div>
            </CardBlock>
          </div>
          <div className={classnames('pt-5', 'md:pt-9')}>
            <GridLayout>
              <SocialCard />
              <CardBlock border title={Identities.twitter}>
                <SecondarySubheaderText big>@uwxan</SecondarySubheaderText>
                <Group title="NFT badges you have">
                  <Section>
                    <RegularText>100M followers</RegularText>
                    <Button type={ButtonType.success}>Link</Button>
                  </Section>
                  <Section>
                    <RegularText>5y old account</RegularText>
                    <Button type={ButtonType.error}>Unlink</Button>
                  </Section>
                </Group>
                <Group title="NFT badges you can create">
                  <Section>
                    <RegularText>Followed by Obama</RegularText>
                    <Button type={ButtonType.accent}>Create</Button>
                  </Section>
                  <Section>
                    <RegularText>Follows 100K users</RegularText>
                    <Button type={ButtonType.accent}>Create</Button>
                  </Section>
                </Group>
              </CardBlock>
              <CardBlock border title={Identities.linkedin}>
                <SecondarySubheaderText big>@uwxan</SecondarySubheaderText>

                <Group title="NFT badges you have">
                  <Section>
                    <RegularText>100K connections</RegularText>
                    <Button type={ButtonType.success}>Link</Button>
                  </Section>
                  <Section></Section>
                </Group>
                <Group title="NFT badges you can create">
                  <Section>
                    <RegularText>Connected to Trump</RegularText>
                    <Button type={ButtonType.accent}>Create</Button>
                  </Section>
                  <Section>
                    <RegularText>15y old account</RegularText>
                    <Button type={ButtonType.accent}>Create</Button>
                  </Section>
                </Group>
              </CardBlock>
            </GridLayout>
          </div>
        </IntlProvider>
      </Root>
    </ThemeProvider>
  )
}

export default App
