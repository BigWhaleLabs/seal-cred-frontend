import UserStore from 'stores/UserStore'
import axios from 'axios'

const baseURL = process.env.REACT_APP_BACKEND
const headers = { 'Content-Type': 'application/json' }

const Api = axios.create({ baseURL, headers })

Api.interceptors.request.use((request) => {
  return request
})

Api.interceptors.request.use((request) => {
  request.headers = {
    ethaddress: UserStore.ethaddress,
    signaddress: UserStore.signaddress,
    ...request.headers,
  }
  return request
})

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error)
    // throw error
  }
)

export default Api
