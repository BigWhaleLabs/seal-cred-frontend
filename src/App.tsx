import { BodyText } from 'components/Text'
import { FormattedMessage } from 'react-intl'
import { configure } from 'mobx'
import IntlProvider from 'i18n/IntlProvider'
import Root from 'components/Root'

configure({
  enforceActions: 'never',
})

const App = () => {
  return (
    <Root>
      <IntlProvider>
        <BodyText>
          <FormattedMessage id="title" />
        </BodyText>
      </IntlProvider>
    </Root>
  )
}

export default App
