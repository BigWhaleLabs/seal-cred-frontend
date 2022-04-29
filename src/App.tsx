import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Main from 'pages/Main'
import Navbar from 'components/Navbar'
import NotFound from 'pages/NotFound'
import Root from 'components/Root'

export default function App() {
  const { theme } = useSnapshot(AppStore)
  return (
    <Root>
      <Router>
        <Navbar />
        <ToastContainer position="bottom-right" theme={theme} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Root>
  )
}
