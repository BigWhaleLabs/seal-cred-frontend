import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { lazy } from 'react'
import Announcement from 'components/Announcement'
import Footer from 'components/Footer'
import LazyComponent from 'components/LazyComponent'
import Navbar from 'components/navbar/Navbar'
import Privacy from 'pages/Privacy'
import Root from 'components/Root'
import Terms from 'pages/Terms'
import classnames, { space } from 'classnames/tailwind'

const NotFound = lazy(() => import('pages/NotFound'))
const OwnedBadge = lazy(() => import('pages/OwnedBadge'))
const Landing = lazy(() => import('pages/Landing'))
const Main = lazy(() => import('pages/Main'))
const EmailProof = lazy(() => import('pages/EmailProof'))

const pageContainer = classnames(space('space-y-6', 'sm:space-y-10'))

export default function () {
  return (
    <Root>
      <Router>
        <Announcement redirectTo="/email" />
        <div className={pageContainer}>
          <Navbar />
          <ToastContainer position="bottom-right" theme="dark" />
          <div className={space('space-y-4')}>
            <Routes>
              <Route
                path="/email"
                element={<LazyComponent lazyImported={<EmailProof />} />}
              />
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
                path="/terms"
                element={<LazyComponent lazyImported={<Terms />} />}
              />
              <Route
                path="/privacy"
                element={<LazyComponent lazyImported={<Privacy />} />}
              />
              <Route
                path="*"
                element={<LazyComponent lazyImported={<NotFound />} />}
              />
            </Routes>
            <Footer />
          </div>
        </div>
      </Router>
    </Root>
  )
}
