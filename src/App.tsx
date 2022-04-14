import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Main from 'pages/Main'
import Navbar from 'components/Navbar'
import NotFound from 'pages/NotFound'
import ProofStore from 'stores/ProofStore'
import Root from 'components/Root'

export default function App() {
  ProofStore.startIntervalChecker()
  return (
    <Root>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Root>
  )
}
