import {
  goerliDefaultProvider,
  mainnetDefaultProvider,
} from 'helpers/defaultProvider'
import {
  goerliHeavyProvider,
  mainnetHeavyProvider,
} from 'helpers/providers/heavyProvider'
import { utils } from 'ethers'
import Network from 'models/Network'
import networkPick from 'helpers/networkPick'

const transferEventInterface = new utils.Interface([
  'event Transfer(address indexed from, address indexed to, uint indexed tokenId)',
])

const sig = 'Transfer(address,address,uint256)'
const sigHash = utils.keccak256(utils.toUtf8Bytes(sig))

export function isTransferEvent(topics: string[]) {
  return topics[0] === sigHash && topics.length > 3
}

export function parseLogData({
  data,
  topics,
}: {
  data: string
  topics: string[]
}) {
  return transferEventInterface.parseLog({ data, topics })
}

export default async function (
  account: string,
  fromBlock = 0,
  toBlock: number,
  addressToTokenIds: { [address: string]: Set<string> },
  skipTransactions: Set<string>,
  network: Network
) {
  const provider =
    fromBlock === 0
      ? networkPick(network, goerliHeavyProvider, mainnetHeavyProvider)
      : networkPick(network, goerliDefaultProvider, mainnetDefaultProvider)
  const receivedLogs = await provider.getLogs({
    fromBlock,
    toBlock,
    topics: [utils.id(sig), null, utils.hexZeroPad(account, 32)],
  })

  const sentLogs = await provider.getLogs({
    fromBlock,
    toBlock,
    topics: [utils.id(sig), utils.hexZeroPad(account, 32)],
  })

  for (const { topics, data, address, transactionHash } of receivedLogs.concat(
    sentLogs
  )) {
    if (!isTransferEvent(topics)) continue

    const {
      args: { tokenId },
    } = parseLogData({ data, topics })

    if (skipTransactions.has(transactionHash)) {
      skipTransactions.delete(transactionHash)
      continue
    }

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
