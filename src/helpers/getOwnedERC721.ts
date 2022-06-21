import { utils } from 'ethers'
import defaultProvider from 'helpers/defaultProvider'

const transferEventInterface = new utils.Interface([
  'event Transfer(address indexed from, address indexed to, uint indexed tokenId)',
])

const sig = 'Transfer(address,address,uint256)'
const sigHash = utils.keccak256(utils.toUtf8Bytes(sig))

export default async function (
  account: string,
  fromBlock = 0,
  toBlock: number,
  addressToTokenIds: { [address: string]: Set<string> }
) {
  const receivedLogs = await defaultProvider.getLogs({
    fromBlock,
    toBlock,
    topics: [utils.id(sig), null, utils.hexZeroPad(account, 32)],
  })

  const sentLogs = await defaultProvider.getLogs({
    fromBlock,
    toBlock,
    topics: [utils.id(sig), utils.hexZeroPad(account, 32)],
  })

  for (const { topics, data, address } of receivedLogs.concat(sentLogs)) {
    if (topics[0] !== sigHash || topics.length <= 3) continue

    const {
      args: { tokenId },
    } = transferEventInterface.parseLog({ data, topics })

    const value = tokenId.toString()

    if (!addressToTokenIds[address]) {
      addressToTokenIds[address] = new Set([value])
    } else if (addressToTokenIds[address].has(value)) {
      addressToTokenIds[address].delete(value)
      if (!addressToTokenIds[address].size) delete addressToTokenIds[address]
    } else {
      addressToTokenIds[address].add(value)
    }
  }

  return addressToTokenIds
}
