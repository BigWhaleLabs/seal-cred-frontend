/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CleanOptions, ValidatorSpec } from 'helpers/envalid/types'
import { EnvError, EnvMissingError } from 'helpers/envalid/errors'

function validateVar<T>({
  spec,
  name,
  rawValue,
}: {
  name: string
  rawValue: string | T
  spec: ValidatorSpec<T>
}) {
  if (typeof spec._parse !== 'function') {
    throw new EnvError(`Invalid spec for "${name}"`)
  }
  const value = spec._parse(rawValue as string)

  if (value == null) throw new EnvError(`Invalid value for env var "${name}"`)
  return value
}

const readRawEnvValue = <T>(env: unknown, k: keyof T): string | T[keyof T] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (env as any)[k]
}

export default function getSanitizedEnv<T>(
  environment: unknown,
  specs: { [K in keyof T]: ValidatorSpec<T[K]> },
  options: CleanOptions<T> = {}
): T {
  const cleanedEnv = {} as T
  const errors: Partial<Record<keyof T, Error>> = {}
  const varKeys = Object.keys(specs) as Array<keyof T>

  for (const k of varKeys) {
    const spec = specs[k]
    const rawValue = readRawEnvValue(environment, k)

    if (rawValue === undefined) {
      if (spec.default) {
        // @ts-expect-error default values can break the rules slightly by being explicitly set to undefined
        cleanedEnv[k] = spec.default
        continue
      }
    }

    try {
      if (rawValue === undefined) {
        // @ts-ignore Need to figure out why explicitly undefined default breaks inference
        cleanedEnv[k] = undefined
        throw new EnvMissingError(`Missing ${cleanedEnv[k]}`)
      } else {
        cleanedEnv[k] = validateVar({ name: k as string, spec, rawValue })
      }
    } catch (err) {
      if (options?.reporter === null) throw err
      if (err instanceof Error) errors[k] = err
    }
  }

  return cleanedEnv
}
