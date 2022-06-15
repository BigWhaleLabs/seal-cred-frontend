import { utils } from 'ethers'
import defaultProvider from 'helpers/defaultProvider'

const iface = new utils.Interface([
  'event Transfer(address indexed from, address indexed to, uint indexed tokenId)',
])

const sig = 'Transfer(address,address,uint256)'
const sigHash = utils.keccak256(utils.toUtf8Bytes(sig))

export default async function (account: string) {
  const receivedLogs = await defaultProvider.getLogs({
    fromBlock: 0,
    toBlock: 'latest',
    topics: [utils.id(sig), null, utils.hexZeroPad(account, 32)],
  })

  const sentLogs = await defaultProvider.getLogs({
    fromBlock: 0,
    toBlock: 'latest',
    topics: [utils.id(sig), utils.hexZeroPad(account, 32)],
  })

  let receivedLog = receivedLogs.pop()
  let sentLog = sentLogs.pop()
  let current = null

  const ownedTokens: { [token: string]: number } = {}

  while (receivedLog || sentLog) {
    const isLastToBefore = !sentLog
      ? true
      : receivedLog && receivedLog.blockNumber === sentLog.blockNumber
      ? receivedLog.logIndex < sentLog.logIndex
      : receivedLog && receivedLog.blockNumber > sentLog.blockNumber

    if (isLastToBefore) {
      current = receivedLog
      receivedLog = receivedLogs.pop()
    } else {
      current = sentLog
      sentLog = sentLogs.pop()
    }

    if (current && current.topics[0] === sigHash && current.topics.length > 3) {
      const data = current.data
      const topics = current.topics
      const result = iface.parseLog({ data, topics })

      if (result.args.from === result.args.to) continue

      const tokenId = (result.args.tokenId + 1).toString()

      if (typeof ownedTokens[current.address] === 'undefined') {
        ownedTokens[current.address] = tokenId
      } else {
        ownedTokens[current.address] ^= tokenId
      }

      if (ownedTokens[current.address] === 0)
        delete ownedTokens[current.address]
    }
  }

  return Object.keys(ownedTokens)
}
