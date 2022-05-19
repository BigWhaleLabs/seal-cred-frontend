/* eslint-disable import/prefer-default-export */
import { CleanOptions, ValidatorSpec } from 'helpers/envalid/types'
import {
  getSanitizedEnv,
  strictProxyMiddleware,
} from 'helpers/envalid/middlewares'

/**
 * Returns a sanitized, immutable environment object. _Only_ the env vars
 * specified in the `validators` parameter will be accessible on the returned
 * object.
 * @param environment An object containing your env vars (eg. process.env).
 * @param specs An object that specifies the format of required vars.
 * @param options An object that specifies options for cleanEnv.
 */
export function cleanEnv<T extends object>(
  environment: unknown,
  specs: { [K in keyof T]: ValidatorSpec<T[K]> },
  options: CleanOptions<T> = {}
): Readonly<T> {
  const cleaned = getSanitizedEnv(environment, specs, options)
  return Object.freeze(strictProxyMiddleware(cleaned, environment))
}
