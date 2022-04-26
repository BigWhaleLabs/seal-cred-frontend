import { IncrementalMerkleTree } from '@zk-kit/incremental-merkle-tree'
import { getAddresses, getTokenId } from 'helpers/getContractData'
import WalletStore from 'stores/WalletStore'
import poseidon from 'poseidon/poseidon.js'

export default async function createTreeProof(contract?: string) {
  if (!contract || !WalletStore.account) return
  const tokenId = await getTokenId(contract, WalletStore.account)
  const addresses = await getAddresses(contract)
  if (!addresses || tokenId === undefined) return

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
  proof.siblings[0] = addresses[siblingIndex]
  console.log('Merkle root', `0x${proof.root.toString(16)}`)
  proof.root = proof.root.toString()

  return proof
}
