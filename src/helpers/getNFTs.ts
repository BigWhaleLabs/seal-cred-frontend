import { ERC721__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { utils } from 'ethers'
import defaultProvider from 'helpers/defaultProvider'

interface TokenTransaction {
  to: string
  from: string
  contract: string
  transaction: string
  tokenId: string
}

const iface = new utils.Interface([
  'event Transfer(address indexed from, address indexed to, uint indexed tokenId)',
])

const sig = 'Transfer(address,address,uint256)'
const sigHash = utils.keccak256(utils.toUtf8Bytes(sig))

export default async function (account: string) {
  return (
    await defaultProvider.getLogs({
      fromBlock: 0,
      toBlock: 'latest',
      topics: [utils.id(sig), null, utils.hexZeroPad(account, 32)],
    })
  )
    .map((log) => {
      console.log(log)
      if (log.topics[0] !== sigHash) return null
      if (log.topics.length <= 3) return null
      const data = log.data
      const topics = log.topics
      const result = iface.parseLog({ data, topics })
      return {
        contract: log.address,
        transaction: log.transactionHash,
        to: result.args.to,
        from: result.args.from,
        tokenId: result.args.tokenId.toString(),
      }
    })
    .filter((o) => o !== null) as TokenTransaction[]
}

export function getERC721s(tokens: TokenTransaction[]) {
  return tokens.map((token) =>
    ERC721__factory.connect(token.contract, defaultProvider)
  )
}
