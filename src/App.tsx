import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from 'pages/Home'
import Navbar from 'components/Navbar'
// import Public from 'pages/Public'
import Root from 'components/Root'

export default function App() {
  return (
    <Root>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/:address" element={<Public />} /> */}
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Root>
  )
}
