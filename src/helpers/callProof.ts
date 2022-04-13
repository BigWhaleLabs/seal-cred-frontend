import { MerkleProof } from '@zk-kit/incremental-merkle-tree'
import EcdsaInput from 'models/EcdsaInput'
import ProofBody from 'models/ProofBody'
import ProofResponse from 'models/ProofResponse'
import axios from 'axios'

export default async function callProof(
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

  const { data } = await axios.post<ProofResponse>(
    'https://verify.streetcred.one/proof',
    req,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  )

  return data
}
