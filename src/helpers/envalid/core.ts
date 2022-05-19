import { EnvError, EnvMissingError } from 'helpers/envalid/errors'
import { ValidatorSpec } from 'helpers/envalid/types'
import {
  accessorMiddleware,
  strictProxyMiddleware,
} from 'helpers/envalid/middlewares'

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

  if (spec.choices) {
    if (!Array.isArray(spec.choices)) {
      throw new TypeError(`"choices" must be an array (in spec for "${name}")`)
    } else if (!spec.choices.includes(value)) {
      throw new EnvError(`Value "${value}" not in choices [${spec.choices}]`)
    }
  }
  if (value == null) throw new EnvError(`Invalid value for env var "${name}"`)
  return value
}

export const applyDefaultMiddleware = <T>(cleanedEnv: T, rawEnv: unknown) => {
  return strictProxyMiddleware(accessorMiddleware(cleanedEnv, rawEnv), rawEnv)
}

const readRawEnvValue = <T>(env: unknown, k: keyof T): string | T[keyof T] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (env as any)[k]
}

export default function getSanitizedEnv<T>(
  environment: unknown,
  specs: { [K in keyof T]: ValidatorSpec<T[K]> }
): T {
  const cleanedEnv = {} as T
  const errors: Partial<Record<keyof T, Error>> = {}
  const varKeys = Object.keys(specs) as Array<keyof T>

  for (const k of varKeys) {
    const spec = specs[k]
    const rawValue = readRawEnvValue(environment, k)

    // If no value was given and default were provided, return the appropriate default
    // value without passing it through validation
    if (rawValue === undefined) {
      if (spec.default) {
        // @ts-expect-error default values can break the rules slightly by being explicitly set to undefined
        cleanedEnv[k] = spec.default
        continue
      }
    }

    try {
      if (rawValue === undefined) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Need to figure out why explicitly undefined default/devDefault breaks inference
        cleanedEnv[k] = undefined
        throw new EnvMissingError(spec)
      } else {
        cleanedEnv[k] = validateVar({ name: k as string, spec, rawValue })
      }
    } catch (err) {
      if (err instanceof Error) errors[k] = err
    }
  }

  return cleanedEnv
}
