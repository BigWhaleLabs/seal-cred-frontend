import 'index.css'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { render } from 'preact'
import App from 'App'

injectStyle()

render(<App />, document.getElementById('root') as Element)
