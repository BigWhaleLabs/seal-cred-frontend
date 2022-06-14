import { utils } from 'ethers'
import defaultProvider from 'helpers/defaultProvider'

const iface = new utils.Interface([
  'event Transfer(address indexed from, address indexed to, uint indexed tokenId)',
])

const sig = 'Transfer(address,address,uint256)'
const sigHash = utils.keccak256(utils.toUtf8Bytes(sig))

export default async function (account: string) {
  const eventsTo = await defaultProvider.getLogs({
    fromBlock: 0,
    toBlock: 'latest',
    topics: [utils.id(sig), null, utils.hexZeroPad(account, 32)],
  })

  const eventsFrom = await defaultProvider.getLogs({
    fromBlock: 0,
    toBlock: 'latest',
    topics: [utils.id(sig), utils.hexZeroPad(account, 32)],
  })

  const events = []
  while (eventsTo.length > 0 || eventsFrom.length > 0) {
    if (eventsTo.length === 0) {
      events.push(eventsFrom.pop())
      continue
    }

    if (eventsFrom.length === 0) {
      events.push(eventsTo.pop())
      continue
    }

    const lastTo = eventsTo[eventsTo.length - 1]
    const lastFrom = eventsFrom[eventsFrom.length - 1]

    if (lastTo.blockNumber > lastFrom.blockNumber) {
      events.push(eventsTo.pop())
      continue
    }
    if (lastTo.blockNumber < lastFrom.blockNumber) {
      events.push(eventsFrom.pop())
      continue
    }

    events.push(
      lastTo.logIndex > lastFrom.logIndex ? eventsTo.pop() : eventsFrom.pop()
    )
  }

  const parsedLogs = events.reverse().map((log) => {
    if (!log) return null
    if (log.topics[0] !== sigHash) return null
    const data = log.data
    const topics = log.topics
    if (topics.length <= 3) return null
    const result = iface.parseLog({ data, topics })

    return {
      contract: log.address,
      transaction: log.transactionHash,
      to: result.args.to,
      from: result.args.from,
      tokenId: result.args.tokenId.toString(),
    }
  })

  const contractMap = parsedLogs.reduce(
    (resultMap, info) =>
      info && info.contract && info.from !== info.to
        ? {
            ...resultMap,
            [info.contract]:
              typeof resultMap[info.contract] !== 'undefined'
                ? resultMap[info.contract] ^ (info.tokenId + 1)
                : info.tokenId + 1,
          }
        : resultMap,
    {} as { [tokenAddress: string]: number }
  )

  return Object.entries(contractMap).reduce(
    (chain, [key, value]) => (value > 0 ? [...chain, key] : chain),
    [] as string[]
  )
}
