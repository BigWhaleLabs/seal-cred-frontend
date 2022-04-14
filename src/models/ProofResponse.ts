export default interface ProofResponse {
  proof: {
    pi_a: [any, any]
    pi_b: [[any, any], [any, any]]
    pi_c: [any, any]
    protocol: any
    curve: any
  }
  publicSignals: [any, any]
}
