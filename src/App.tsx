import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { configure } from 'mobx'
import Home from 'pages/Home'
import IntlProvider from 'i18n/IntlProvider'
import Navbar from 'components/Navbar'
import Public from 'pages/Public'
import Root from 'components/Root'
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
          <Router>
            <Switch>
              <Route path="/:address" component={Public} />
              <Route path="/" component={Home} />
            </Switch>
          </Router>
        </IntlProvider>
      </Root>
    </ThemeProvider>
  )
}

export default App
