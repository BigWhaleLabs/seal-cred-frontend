import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND as string
const headers = { 'Content-Type': 'application/json' }

const Api = axios.create({ baseURL, headers })

export default Api
