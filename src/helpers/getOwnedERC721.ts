import { BigNumber, utils } from 'ethers'
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
  ownedTokens: { [token: string]: Set<BigNumber> }
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

    if (!ownedTokens[address]) {
      ownedTokens[address] = new Set([tokenId])
    } else if (ownedTokens[address].has(tokenId)) {
      ownedTokens[address].delete(tokenId)
      if (!ownedTokens[address].size) delete ownedTokens[address]
    } else {
      ownedTokens[address].add(tokenId)
    }
  }

  return ownedTokens
}
