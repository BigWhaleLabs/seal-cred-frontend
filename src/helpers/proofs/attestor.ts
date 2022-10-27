import BalanceSignature from 'models/BalanceSignature'
import Network from 'models/Network'
import PublicKey from 'models/PublicKey'
import Signature from 'models/Signature'
import axios from 'axios'
import env from 'helpers/env'

const baseURL = `${env.VITE_VERIFY_URL}/v0.2.1/verify`

export async function requestAddressOwnershipAttestation(
  signature: string,
  message: string
) {
  const { data } = await axios.post<Signature>(`${baseURL}/ethereum-address`, {
    signature,
    message,
  })
  return data
}

export async function requestBalanceAttestation(
  tokenAddress: string,
  network: Network,
  ownerAddress: string
) {
  const { data } = await axios.post<BalanceSignature>(`${baseURL}/balance`, {
    tokenAddress,
    network,
    ownerAddress,
  })
  return data
}

export async function requestContractMetadata(
  network: Network,
  tokenAddress: string
) {
  const { data } = await axios.post<Signature>(`${baseURL}/contract-metadata`, {
    tokenAddress,
    network,
  })
  return data
}

export async function getEddsaPublicKey() {
  const { data } = await axios.get<PublicKey>(`${baseURL}/eddsa-public-key`)
  return data
}

export function sendEmails(emails: string[]) {
  return axios.post(`${baseURL}/email`, {
    emails,
  })
}
