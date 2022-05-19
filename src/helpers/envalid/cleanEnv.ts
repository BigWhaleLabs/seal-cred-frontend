import { ValidatorSpec } from 'helpers/envalid/types'
import { applyDefaultMiddleware } from 'helpers/envalid/core'
import getSanitizedEnv from 'helpers/envalid/core'

export default function cleanEnv<T>(
  environment: unknown,
  specs: { [K in keyof T]: ValidatorSpec<T[K]> }
): Readonly<T> {
  const cleaned = getSanitizedEnv(environment, specs)
  return Object.freeze(applyDefaultMiddleware(cleaned, environment))
}
