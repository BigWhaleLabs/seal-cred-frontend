import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useSnapshot } from 'valtio'
import Landing from 'pages/Landing'
import Main from 'pages/Main'
import Navbar from 'components/Navbar'
import NotFound from 'pages/NotFound'
import OwnedBadge from 'pages/OwnedBadge'
import Root from 'components/Root'
import WalletStore from 'stores/WalletStore'

export default function App() {
  const { account } = useSnapshot(WalletStore)

  return (
    <Root>
      <Router>
        <Navbar />
        <ToastContainer position="bottom-right" theme="dark" />
        <Routes>
          <Route
            path="/public/:derivativeAddress/:tokenId"
            element={<OwnedBadge />}
          />
          <Route path="/" element={account ? <Main /> : <Landing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Root>
  )
}
