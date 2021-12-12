import axios from 'axios'

const baseURL = process.env.REACT_APP_BACKEND
const headers = { 'Content-Type': 'application/json' }

const Api = axios.create({ baseURL, headers })

Api.interceptors.request.use((request) => {
  return request
})

Api.interceptors.request.use((request) => {
  request.headers = {
    // token: UserStore.token, // TODO: get this back? Do we need it at all?
    ...request.headers,
  }
  return request
})

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error)
    // TODO: throw error
  }
)

export default Api
