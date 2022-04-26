import { Contract } from 'ethers'
import erc721abi from 'helpers/erc721abi'
import provider from 'helpers/defaultProvider'

export async function getAddresses(contractAddress: string) {
  const contract = new Contract(contractAddress, erc721abi, provider)
  const eventsFilter = await contract.filters.Transfer()
  const events = await contract.queryFilter(eventsFilter)
  const ownerMap = new Map<string, string>()
  for (const event of events) {
    if (!event.args) {
      continue
    }
    const { to, tokenId } = event.args
    if (to) {
      ownerMap.set(tokenId.toString(), to)
    }
  }
  const setList = new Set(ownerMap.values())
  return [...setList]
}

export async function getTokenId(contractAddress: string, account: string) {
  const contract = new Contract(contractAddress, erc721abi, provider)

  return Number(await contract.balanceOf(account))
}
