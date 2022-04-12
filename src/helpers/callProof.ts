import { MerkleProof } from '@zk-kit/incremental-merkle-tree'
import EcdsaInput from 'models/EcdsaInput'
import ProofBody from 'models/ProofBody'
import ProofResponse from 'models/ProofResponse'
import axios from 'axios'

const baseURL = 'https://verify.streetcred.one'
export interface JobResponse {
  _id: string
  status: string
  input?: {
    root: string
    leaf: string
    pathIndices: Array<number>
    siblings: Array<Array<string>>
    r: Array<string>
    s: Array<string>
    msghash: Array<string>
    pubkey: Array<Array<string>>
  }
  proof?: ProofResponse
}
export interface ProofCheck {
  job: JobResponse
  position?: number
}

export async function callProof(
  proof: MerkleProof | undefined,
  ecdsaInput: EcdsaInput | undefined
) {
  const req: ProofBody = {
    root: proof?.root,
    leaf: proof?.leaf,
    siblings: proof?.siblings,
    pathIndices: proof?.pathIndices,
    r: ecdsaInput?.r,
    s: ecdsaInput?.s,
    msghash: ecdsaInput?.msghash,
    pubkey: ecdsaInput?.pubkey,
  }

  const { data } = await axios.post<JobResponse>(`${baseURL}/proof`, req, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  return data
}

export async function checkJobStatus(id: string) {
  const { data } = await axios.get<ProofCheck>(`${baseURL}/proof/${id}`)
  if (data.job.status === 'failed' || data.job.status === 'cancelled') {
    throw data.job.status
  }

  return data
}
