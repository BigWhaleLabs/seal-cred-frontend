import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { lazy } from 'react'
import Announcement from 'components/ui/Announcement'
import Footer from 'components/ui/Footer'
import LazyComponent from 'components/ui/LazyComponent'
import Navbar from 'components/navbar/Navbar'
import Privacy from 'pages/Privacy'
import Root from 'components/ui/Root'
import ScrollToTop from 'components/ui/ScrollToTop'
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
  margin('mx-auto', 'my-6', 'md:mt-0', 'md:mb-auto')
)

export default function () {
  return (
    <Root>
      <Router>
        <ScrollToTop>
          <div className={pageContainer}>
            <Announcement redirectTo="/email" />
            <Navbar />
            <div className={bodyContainer}>
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
            </div>
            <Footer />
          </div>
        </ScrollToTop>
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </Root>
  )
}
