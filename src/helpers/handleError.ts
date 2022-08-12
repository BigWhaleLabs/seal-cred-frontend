import { serializeError } from 'eth-rpc-errors'
import { toast } from 'react-toastify'
import axios, { AxiosError } from 'axios'
import parseRevertReason from 'helpers/parseRevertReason'

export const ProofGenerationErrors = {}

export const ErrorList = {
  wrongNetwork: (userNetwork: string, contractNetwork: string) =>
    `Looks like you're using ${userNetwork} network, try switching to ${contractNetwork}`,
  unknown: 'An unknown error occurred, please, contact us',
  clear: '',
}

function transformRelayErrorMessage(message: string) {
  // Removes stack trace information
  return message
    .split('stack')
    .filter((_, i) => i % 2 === 0)
    .join('\n')
}

export default function (error: unknown) {
  console.error(error)

  let displayedError: string | undefined

  if (typeof error === 'string') displayedError = error
  if (error instanceof Error || axios.isAxiosError(error))
    displayedError = error.message
  const message = serializeError(error).message
  if (message) {
    displayedError = parseRevertReason(message) ?? message
  }
  if (error instanceof AxiosError && error.response?.data?.message) {
    displayedError = error.response?.data?.message
  }
  if (!displayedError) displayedError = ErrorList.unknown

  if (/^Failed to relay call/.test(displayedError))
    displayedError = transformRelayErrorMessage(displayedError)

  toast.error(displayedError)
}
