export type DefaultType<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends object
  ? object
  : unknown

export interface Spec<T> {
  /**
   * A fallback value, which will be used if the env var wasn't specified. Providing a default effectively makes the env var optional.
   */
  default?: DefaultType<T>
}

export interface CleanOptions<T> {
  /**
   * Pass in a function to override the default error handling and console output.
   * See ./reporter.ts for the default implementation.
   */
  reporter?: ((opts: ReporterOptions<T>) => void) | null
}

export interface ValidatorSpec<T> extends Spec<T> {
  _parse: (input: string) => T
}

export interface ReporterOptions<T> {
  errors: Partial<Record<keyof T, Error>>
  env: unknown
}
