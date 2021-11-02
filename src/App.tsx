import { BodyText } from 'components/Text'
import { FormattedMessage } from 'react-intl'
import { configure } from 'mobx'
import IntlProvider from 'i18n/IntlProvider'
import LanguageButtons from 'components/LanguageButtons'
import Root from 'components/Root'
import useApp from 'hooks/useApp'

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
        <LanguageButtons />
      </IntlProvider>
    </Root>
  )
}

export default App
