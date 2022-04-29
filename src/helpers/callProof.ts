import { MerkleProof } from '@zk-kit/incremental-merkle-tree'
import EcdsaInput from 'models/EcdsaInput'
import ProofBody from 'models/ProofBody'
import ProofCheck from 'models/ProofCheck'
import axios from 'axios'

const baseURL = 'https://verify.streetcred.one'

export async function scheduleProofGeneration(
  proof: MerkleProof,
  ecdsaInput: EcdsaInput
) {
  const req: ProofBody = {
    root: proof.root,
    leaf: proof.leaf,
    siblings: proof.siblings,
    pathIndices: proof.pathIndices,
    r: ecdsaInput.r,
    s: ecdsaInput.s,
    msghash: ecdsaInput.msghash,
    pubkey: ecdsaInput.pubkey,
  }

  const { data } = await axios.post<ProofCheck>(`${baseURL}/proof`, req, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  return data
}

export async function checkJobStatus(id: string) {
  const { data } = await axios.get<ProofCheck>(`${baseURL}/proof/${id}`)
  return data
}
