import { toast } from 'react-toastify'
import axios from 'axios'

class ProviderError {
  code: number
  message: string
  stack?: string

  constructor(code: number, message: string, stack?: string) {
    this.code = code
    this.message = message
    this.stack = stack
  }
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
  if (
    error instanceof ProviderError ||
    error instanceof Error ||
    axios.isAxiosError(error)
  ) {
    displayedError = error.message
  } else {
    displayedError = CommonErrors.unknown
  }

  toast.error(displayedError)
}
