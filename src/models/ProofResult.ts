export default interface ProofResult {
  readonly proof: {
    readonly pi_a: readonly [string, string]
    readonly pi_b: readonly [
      readonly [string, string],
      readonly [string, string]
    ]
    readonly pi_c: readonly [string, string]
    readonly protocol: string
    readonly curve: string
  }
  readonly publicSignals: readonly string[]
}
