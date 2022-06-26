import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { lazy } from 'react'
import Announcement from 'components/Announcement'
import LazyComponent from 'components/LazyComponent'
import Navbar from 'components/navbar/Navbar'
import Root from 'components/Root'

const NotFound = lazy(() => import('pages/NotFound'))
const OwnedBadge = lazy(() => import('pages/OwnedBadge'))
const WorkFlow = lazy(() => import('pages/WorkFlow'))
const Landing = lazy(() => import('pages/Landing'))
const Main = lazy(() => import('pages/Main'))

export default function () {
  return (
    <Root>
      <Router>
        <Announcement />
        <Navbar />
        <ToastContainer position="bottom-right" theme="dark" />
        <Routes>
          <Route
            path="/:derivativeAddress/:tokenId"
            element={<LazyComponent lazyImported={<OwnedBadge />} />}
          />
          <Route
            path="/work"
            element={<LazyComponent lazyImported={<WorkFlow />} />}
          />
          <Route
            path="/"
            element={<LazyComponent lazyImported={<Landing />} />}
          />
          <Route
            path="/app"
            element={<LazyComponent lazyImported={<Main />} />}
          />
          <Route
            path="*"
            element={<LazyComponent lazyImported={<NotFound />} />}
          />
        </Routes>
      </Router>
    </Root>
  )
}
