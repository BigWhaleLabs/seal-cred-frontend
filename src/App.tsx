import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { lazy } from 'react'
import { space, visibility } from 'classnames/tailwind'
import Announcement from 'components/Announcement'
import Footer from 'components/Footer'
import LazyComponent from 'components/LazyComponent'
import Navbar from 'components/navbar/Navbar'
import Root from 'components/Root'

const NotFound = lazy(() => import('pages/NotFound'))
const OwnedBadge = lazy(() => import('pages/OwnedBadge'))
const Landing = lazy(() => import('pages/Landing'))
const Main = lazy(() => import('pages/Main'))

export default function () {
  return (
    <Root>
      <Router>
        <Announcement redirectTo="/app" />
        <div className={space('space-y-6', 'sm:space-y-10')}>
          <Navbar />
          <ToastContainer position="bottom-right" theme="dark" />
          <Routes>
            <Route
              path="/:derivativeAddress/:tokenId"
              element={<LazyComponent lazyImported={<OwnedBadge />} />}
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
          <div className={visibility('md:invisible', 'visible')}>
            <Footer />
          </div>
        </div>
      </Router>
    </Root>
  )
}
