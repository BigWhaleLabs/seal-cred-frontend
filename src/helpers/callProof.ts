import { MerkleProof } from '@zk-kit/incremental-merkle-tree'
import EcdsaInput from 'models/EcdsaInput'
import JobResponse from 'models/JobResponse'
import ProofBody from 'models/ProofBody'
import ProofCheck from 'models/ProofCheck'
import ProofResponse from 'models/ProofResponse'
import axios from 'axios'

const baseURL = 'https://verify.streetcred.one'

export async function scheduleProofGeneration(
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

  if (data.job?.proof) {
    const { proof, publicSignals } = data.job.proof
    const dataInHex: ProofResponse = {
      proof: {
        pi_a: [p256(proof.pi_a[0]), p256(proof.pi_a[1])],
        pi_b: [
          [p256(proof.pi_b[0][1]), p256(proof.pi_b[0][0])],
          [p256(proof.pi_b[1][1]), p256(proof.pi_b[1][0])],
        ],
        pi_c: [p256(proof.pi_c[0]), p256(proof.pi_c[1])],
        protocol: proof.protocol,
        curve: proof.curve,
      },
      publicSignals: [p256(publicSignals[0]), p256(publicSignals[1])],
    }
    return { ...data, job: { ...data.job, proof: dataInHex } }
  }

  return data
}

function p256(n: string) {
  let nstr = BigInt(n).toString(16)
  while (nstr.length < 64) nstr = '0' + nstr
  nstr = '0x' + nstr
  return nstr
}
