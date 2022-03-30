import { useEffect } from 'preact/hooks'
import { useState } from 'react'
import createTreeProof from 'helpers/createTreeProof'

export default function useMerkleTree() {
  const [merkleVerified, setMerkleVerified] = useState<boolean>()

  useEffect(() => {
    async function verify() {
      setMerkleVerified(await createTreeProof())
    }

    void verify()
  }, [])

  return {
    merkleVerified,
  }
}
