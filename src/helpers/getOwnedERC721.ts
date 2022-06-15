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

  const ownedTokens: { [token: string]: number } = {}

  for (const log of receivedLogs.concat(sentLogs)) {
    if (log.topics[0] === sigHash && log.topics.length > 3) {
      const data = log.data
      const topics = log.topics
      const result = iface.parseLog({ data, topics })

      if (result.args.from === result.args.to) continue

      const tokenId = (result.args.tokenId + 1).toString()

      if (typeof ownedTokens[log.address] === 'undefined') {
        ownedTokens[log.address] = tokenId
      } else {
        ownedTokens[log.address] ^= tokenId
      }

      if (ownedTokens[log.address] === 0) delete ownedTokens[log.address]
    }
  }

  return Object.keys(ownedTokens)
}
