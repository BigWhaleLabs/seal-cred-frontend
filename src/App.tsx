import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Landing from 'pages/Landing'
import Main from 'pages/Main'
import Navbar from 'components/Navbar'
import NotFound from 'pages/NotFound'
import OwnedBadge from 'pages/OwnedBadge'
import Root from 'components/Root'

export default function App() {
  return (
    <Root>
      <Router>
        <Navbar />
        <ToastContainer position="bottom-right" theme="dark" />
        <Routes>
          <Route path="/:derivativeAddress/:tokenId" element={<OwnedBadge />} />
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<Main />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Root>
  )
}
