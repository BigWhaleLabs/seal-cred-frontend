import { MetaMaskProvider } from 'metamask-react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from 'pages/Home'
import Navbar from 'components/Navbar'
import Public from 'pages/Public'
import Root from 'components/Root'
import ThemeProvider from 'components/ThemeProvider'

const App = () => {
  return (
    <ThemeProvider>
      <MetaMaskProvider>
        <Root>
          <Navbar />
          <Router>
            <Routes>
              <Route path="/:address" element={<Public />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </Root>
      </MetaMaskProvider>
    </ThemeProvider>
  )
}

export default App
