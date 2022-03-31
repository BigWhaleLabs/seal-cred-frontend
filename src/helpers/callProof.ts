import { MerkleProof } from '@zk-kit/incremental-merkle-tree'
import EcdsaInput from 'models/EcdsaInput'
import ProofBody from 'models/ProofBody'
import ProofResponse from 'models/ProofResponse'
import axios from 'axios'

export default async function callProof(
  proof: MerkleProof | undefined,
  ecdsaInput: EcdsaInput
) {
  const req: ProofBody = {
    root: proof?.root,
    leaf: proof?.leaf,
    siblings: proof?.siblings,
    pathIndices: proof?.pathIndices,
    r: ecdsaInput.r,
    s: ecdsaInput.s,
    msghash: ecdsaInput.msghash,
    pubkey: ecdsaInput.pubkey,
  }

  try {
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

    console.log(JSON.stringify(data, null, 4))

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('unexpected error: ', error)
      return 'An unexpected error occurred'
    }
  }
}
