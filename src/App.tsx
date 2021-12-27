import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Main from 'pages/Main'
import NotFound from 'pages/NotFound'
import Navbar from 'components/Navbar'
import Root from 'components/Root'

export default function App() {
  return (
    <Root>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/public/:address" element={<Main />} />
          <Route path="/:connectingIdentityType" element={<Main />} />
          <Route path="/" element={<Main />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Root>
  )
}
