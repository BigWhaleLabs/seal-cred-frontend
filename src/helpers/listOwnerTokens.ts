import { Account } from 'stores/PublicAccountStore'
import { providers, utils } from 'ethers'
import TokenTransaction from 'models/TokenTransaction'

const listOwnerTokens = async (account: Account) => {
  const provider = new providers.InfuraProvider(
    import.meta.env.VITE_ETH_NETWORK as string,
    import.meta.env.VITE_INFURA_ID as string
  )
  const iface = new utils.Interface([
    'event Transfer(address indexed from, address indexed to, uint indexed tokenId)',
  ])
  const sig = 'Transfer(address,address,uint256)'
  const sigHash = utils.keccak256(utils.toUtf8Bytes(sig))

  return (
    await provider.getLogs({
      fromBlock: 0,
      toBlock: 'latest',
      topics: [utils.id(sig), null, utils.hexZeroPad(account.address, 32)],
    })
  )
    .map((log) => {
      if (log.topics[0] !== sigHash) return null
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

export default listOwnerTokens
