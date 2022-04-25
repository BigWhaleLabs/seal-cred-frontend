import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Main from 'pages/Main'
import Navbar from 'components/Navbar'
import NotFound from 'pages/NotFound'
import Root from 'components/Root'

export default function App() {
  const { theme } = useSnapshot(AppStore)

  injectStyle()

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
