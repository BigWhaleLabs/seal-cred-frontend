type DefaultType<T> = T extends string
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
   * An Array that lists the admissable parsed values for the env var.
   */
  choices?: ReadonlyArray<T>
  default?: DefaultType<T>
}

export interface ValidatorSpec<T> extends Spec<T> {
  _parse: (input: string) => T
}
