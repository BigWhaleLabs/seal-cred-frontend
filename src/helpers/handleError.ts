import { serializeError } from 'eth-rpc-errors'
import { toast } from 'react-toastify'
import axios from 'axios'

export const ProofGenerationErrors = {
  invalidProof: 'Merkle Tree Proof is not valid',
}

export const EthErrors = {
  wrongNetwork: (userNetwork: string, contractNetwork: string) =>
    `Looks like you're using ${userNetwork} network, try switching to ${contractNetwork} and connect again`,
}

export const CommonErrors = {
  unknown: 'An unknown error occurred, please, contact us',
  clear: '',
}

export function handleError(error: unknown) {
  console.error(error)

  let displayedError: string

  if (typeof error === 'string') displayedError = error
  const message = serializeError(error).message
  if (message) displayedError = message
  if (error instanceof Error || axios.isAxiosError(error)) {
    displayedError = error.message
  } else {
    displayedError = CommonErrors.unknown
  }

  toast.error(displayedError)
}

// if (/User denied message signature/.test(message))
//   return setError(Errors.noSignature)
// if (/cannot estimate gas/.test(message))
//   return setError(Errors.insufficientFunds)
// if (/eth_getBlockByNumber/.test(message))
//   return setError(Errors.mintError)
