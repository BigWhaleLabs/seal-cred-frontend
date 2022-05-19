import { Spec, ValidatorSpec } from 'helpers/envalid/types'

export const makeValidator = <T>(parseFn: (input: string) => T) => {
  return function (spec?: Spec<T>): ValidatorSpec<T> {
    return { ...spec, _parse: parseFn }
  }
}

export function num<T extends number>(
  spec?: Spec<T>,
  errorHandler?: (errorMessage: string) => void
) {
  return makeValidator((input: string) => {
    const reduced = parseFloat(input)
    if (!Number.isNaN(reduced)) return reduced as T

    const errorMessage = `Invalid number input: "${input}"`
    throw errorHandler ? errorHandler(errorMessage) : new Error(errorMessage)
  })(spec)
}

export function str<T extends string>(
  spec?: Spec<T>,
  errorHandler?: (errorMessage: string) => void
) {
  return makeValidator((input: string) => {
    if (typeof input === 'string') return input as T

    const errorMessage = `Not a string: "${input}"`
    throw errorHandler ? errorHandler(errorMessage) : new Error(errorMessage)
  })(spec)
}
