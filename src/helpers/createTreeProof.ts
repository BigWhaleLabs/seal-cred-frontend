import { IncrementalMerkleTree } from '@zk-kit/incremental-merkle-tree'
import { poseidon } from '@big-whale-labs/poseidon'

export default function createTreeProof(tokenId: number, addresses: string[]) {
  const tree = new IncrementalMerkleTree(poseidon, 20, BigInt(0), 2)

  for (const address of addresses) {
    tree.insert(BigInt(address))
  }

  const indexToProve = tokenId
  const siblingIndex =
    indexToProve % 2 === 0 ? indexToProve + 1 : indexToProve - 1

  const proof = tree.createProof(indexToProve)
  proof.leaf = addresses[indexToProve]
  proof.siblings = proof.siblings.map((s) => [s.toString()])
  proof.siblings[0] = addresses[siblingIndex] ?? ['0']
  proof.root = proof.root.toString()

  return proof
}
