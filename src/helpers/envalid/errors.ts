export class EnvError extends TypeError {
  constructor(message?: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this, EnvError)
    this.name = this.constructor.name
  }
}

export class EnvMissingError extends ReferenceError {
  constructor(message?: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this, EnvMissingError)
    this.name = this.constructor.name
  }
}
