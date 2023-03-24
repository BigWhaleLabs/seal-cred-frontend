import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { lazy } from 'react'
import Announcement from 'components/ui/Announcement'
import Footer from 'components/ui/Footer'
import LazyComponent from 'components/ui/LazyComponent'
import Navbar from 'components/navbar/Navbar'
import Privacy from 'pages/Privacy'
import Root from 'components/ui/Root'
import Terms from 'pages/Terms'
import classnames, {
  display,
  flexDirection,
  margin,
  minHeight,
} from 'classnames/tailwind'

const NotFound = lazy(() => import('pages/NotFound'))
const OwnedBadge = lazy(() => import('pages/OwnedBadge'))
const Landing = lazy(() => import('pages/Landing'))
const Main = lazy(() => import('pages/Main'))
const EmailProof = lazy(() => import('pages/EmailProof'))

const pageContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  minHeight('min-h-screen')
)

const bodyContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  margin('my-7', 'xxs:mx-auto', 'tablet:mt-0', 'tablet:mb-auto')
)

export default function () {
  return (
    <Root>
      <Router>
        <div className={pageContainer}>
          <Announcement redirectTo="/email" />
          <Navbar />
          <div className={bodyContainer}>
            <Routes>
              <Route
                element={<LazyComponent lazyImported={<EmailProof />} />}
                path="/email"
              />
              <Route
                element={<LazyComponent lazyImported={<OwnedBadge />} />}
                path="/:derivativeAddress/:tokenId"
              />
              <Route
                element={<LazyComponent lazyImported={<Landing />} />}
                path="/"
              />
              <Route
                element={<LazyComponent lazyImported={<Main />} />}
                path="/app"
              />
              <Route
                element={<LazyComponent lazyImported={<Terms />} />}
                path="/terms"
              />
              <Route
                element={<LazyComponent lazyImported={<Privacy />} />}
                path="/privacy"
              />
              <Route
                element={<LazyComponent lazyImported={<NotFound />} />}
                path="*"
              />
            </Routes>
          </div>
          <Footer />
        </div>
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </Root>
  )
}
