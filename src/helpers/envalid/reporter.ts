/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnvMissingError } from 'helpers/envalid/errors'
import { ReporterOptions } from 'helpers/envalid/types'

type Errors<T> = Partial<Record<keyof T, Error>>
type Logger = (data: any, ...args: any[]) => void

type ExtraOptions<T> = {
  onError?: (errors: Errors<T>) => void
  logger: (output: string) => void
}

const defaultLogger = console.error.bind(console)

export const envalidErrorFormatter = <T = any>(
  errors: Errors<T>,
  logger: Logger = defaultLogger
) => {
  const missingVarsOutput: string[] = []
  const invalidVarsOutput: string[] = []
  for (const [k, err] of Object.entries(errors)) {
    if (err instanceof EnvMissingError) {
      missingVarsOutput.push(`${k}: ${err.message || '(required)'}`)
    } else
      invalidVarsOutput.push(
        `${k}: ${(err as Error)?.message || '(invalid format)'}`
      )
  }

  // Prepend "header" output for each section of the output:
  if (invalidVarsOutput.length) {
    invalidVarsOutput.unshift('Invalid environment variables: ')
  }
  if (missingVarsOutput.length) {
    missingVarsOutput.unshift('Missing environment variables: ')
  }

  const output = [
    invalidVarsOutput.sort().join('\n'),
    missingVarsOutput.sort().join('\n'),
  ]
    .filter((x) => !!x)
    .join('\n')

  logger(output)
}

export const defaultReporter = <T = any>(
  { errors = {} }: ReporterOptions<T>,
  { onError, logger }: ExtraOptions<T> = { logger: defaultLogger }
) => {
  if (!Object.keys(errors).length) return

  envalidErrorFormatter(errors, logger)

  if (onError) {
    onError(errors)
  } else {
    throw new TypeError('Environment validation failed')
  }
}
