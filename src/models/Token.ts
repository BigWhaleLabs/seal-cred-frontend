export enum OperationStatus {
  unminted = 'unminted',
  minted = 'minted',
  linked = 'linked',
}

export default interface Token {
  status: OperationStatus
  token: string
  template: string
}
