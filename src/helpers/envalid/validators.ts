import { Spec, ValidatorSpec } from 'helpers/envalid/types'
import handleError from 'helpers/handleError'

export const makeValidator = <T>(parseFn: (input: string) => T) => {
  return function (spec?: Spec<T>): ValidatorSpec<T> {
    return { ...spec, _parse: parseFn }
  }
}

export function num<T extends number = number>(spec?: Spec<T>) {
  return makeValidator((input: string) => {
    const reduced = parseFloat(input)
    if (Number.isNaN(reduced))
      return handleError(`Invalid number input: "${input}"`)
    return reduced as T
  })(spec)
}

export function str<T extends string = string>(spec?: Spec<T>) {
  return makeValidator((input: string) => {
    if (typeof input === 'string') return input as T
    return handleError(`Not a string: "${input}"`)
  })(spec)
}
