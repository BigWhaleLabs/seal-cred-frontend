import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Main from 'pages/Main'
import Navbar from 'components/Navbar'
import Root from 'components/Root'

export default function App() {
  return (
    <Root>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/:address" element={<Main />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </Root>
  )
}
