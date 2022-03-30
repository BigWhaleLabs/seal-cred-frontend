import { poseidon } from 'circomlibjs'
import EthStore from 'stores/EthStore'
import MerkleTree from 'merkletreejs'

export default async function createTreeProof() {
  const tokenId = await EthStore.getTokenId()
  const addresses = await EthStore.getAddresses()
  if (!addresses || !tokenId) return

  const leafNodes = Object.values(addresses).map((address: string) =>
    poseidon(address)
  )
  const merkleTree = new MerkleTree(leafNodes, poseidon, {
    sortLeaves: true,
    sortPairs: true,
  })
  const rootHash = merkleTree.getRoot()
  const claimingAddress = leafNodes[tokenId]
  const hexProof = merkleTree.getHexProof(claimingAddress)

  console.log(merkleTree.verify(hexProof, claimingAddress, rootHash))

  return merkleTree.verify(hexProof, claimingAddress, rootHash)
}
