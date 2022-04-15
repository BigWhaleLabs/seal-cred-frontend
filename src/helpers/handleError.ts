import { serializeError } from 'eth-rpc-errors'
import { toast } from 'react-toastify'
import axios from 'axios'

export const ProofGenerationErrors = {}

export const ErrorList = {
  wrongNetwork: (userNetwork: string, contractNetwork: string) =>
    `Looks like you're using ${userNetwork} network, try switching to ${contractNetwork} and connect again`,
  invalidProof: 'Merkle Tree Proof is not valid',
  unknown: 'An unknown error occurred, please, contact us',
  invalidSignature: 'Signature is invalid',
  clear: '',
}

export function handleError(error: unknown) {
  console.error(error)

  let displayedError: string | undefined

  if (typeof error === 'string') displayedError = error
  if (error instanceof Error || axios.isAxiosError(error))
    displayedError = error.message
  const message = serializeError(error).message
  if (message) displayedError = message
  if (!displayedError) displayedError = ErrorList.unknown

  toast.error(displayedError)
}
