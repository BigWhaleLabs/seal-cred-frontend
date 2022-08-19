import { serializeError } from 'eth-rpc-errors'
import { toast } from 'react-toastify'
import axios, { AxiosError } from 'axios'
import parseGSNError from 'helpers/parseGSNError'
import parseRevertReason from 'helpers/parseRevertReason'

export const ProofGenerationErrors = {}

export const ErrorList = {
  wrongNetwork: (userNetwork: string, contractNetwork: string) =>
    `Looks like you're using ${userNetwork} network, try switching to ${contractNetwork}`,
  unknown: 'An unknown error occurred, please, contact us',
  clear: '',
}

export default function (error: unknown) {
  console.error(error)

  let displayedError: string | undefined

  if (typeof error === 'string') displayedError = error
  if (error instanceof Error || axios.isAxiosError(error))
    displayedError = error.message
  const message = serializeError(error).message
  if (message) {
    const gSNMessage = parseGSNError(message)
    const revertMessage = parseRevertReason(message)
    displayedError = gSNMessage || revertMessage || message
  }
  if (error instanceof AxiosError && error.response?.data?.message) {
    displayedError = error.response?.data?.message
  }
  if (!displayedError) displayedError = ErrorList.unknown

  toast.error(displayedError)
}
