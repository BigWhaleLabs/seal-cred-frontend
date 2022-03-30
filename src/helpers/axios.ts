import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND as string
const scProofApi = import.meta.env.VITE_PROOF_API as string
const headers = { 'Content-Type': 'application/json' }

export const ScBackApi = axios.create({ baseURL, headers })
export const ScProofApi = axios.create({ baseURL: scProofApi, headers })
