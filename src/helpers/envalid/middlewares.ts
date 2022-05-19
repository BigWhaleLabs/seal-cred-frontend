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

export function getSanitizedEnv<T>(
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

export const strictProxyMiddleware = <T extends object>(
  envObj: T,
  rawEnv: unknown
) => {
  const inspectables = [
    'length',
    'inspect',
    'hasOwnProperty',
    'toJSON',
    Symbol.toStringTag,
    Symbol.iterator,

    '$$typeof', // For react-refresh

    'then',
    '__esModule',
  ]
  const inspectSymbolStrings = [
    'Symbol(util.inspect.custom)',
    'Symbol(nodejs.util.inspect.custom)',
  ]

  return new Proxy(envObj, {
    get(target, name: string) {
      // These checks are needed because calling console.log on a
      // proxy that throws crashes the entire process. This permits access on
      // the necessary properties for `console.log(envObj)`, `envObj.length`,
      // `envObj.hasOwnProperty('string')` to work.
      if (
        inspectables.includes(name) ||
        inspectSymbolStrings.includes(name.toString())
      ) {
        // @ts-expect-error TS doesn't like symbol types as indexers
        return target[name]
      }

      const varExists = Object.prototype.hasOwnProperty.call(target, name)
      if (!varExists) {
        if (
          typeof rawEnv === 'object' &&
          rawEnv !== null &&
          Object.prototype.hasOwnProperty.call(rawEnv, name)
        ) {
          throw new ReferenceError(
            `[envalid] Env var ${name} was accessed but not validated. This var is set in the environment; please add an envalid validator for it.`
          )
        }

        throw new ReferenceError(`[envalid] Env var not found: ${name}`)
      }

      return target[name as keyof T]
    },

    set(_target, name: string) {
      throw new TypeError(
        `[envalid] Attempt to mutate environment value: ${name}`
      )
    },
  })
}
