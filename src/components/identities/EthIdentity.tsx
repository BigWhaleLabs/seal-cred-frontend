import * as ethers from 'ethers'
import { Identities } from 'components/Identity'
import { SecondarySubheaderText } from 'components/Text'
import { useEffect, useState } from 'react'
import { useMetaMask } from 'metamask-react'
import CardBlock from 'components/CardBlock'
import IdentityBadges from 'components/identities/IndentityBadges'
import Token from 'models/Token'
import genericErc721Abi from 'components/identities/ERC721abi.json'

function useDosuInviteToken() {
  const [hasToken, setHasToken] = useState(false)
  const { account } = useMetaMask()

  useEffect(() => {
    async function start() {
      const tokenContractAddress = '0x0d0a4686dfb7a4f4fe87fb478fe08953b9ed216d'
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(
        tokenContractAddress,
        genericErc721Abi,
        provider
      )
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      const balance = await contract.balanceOf(address)
      setHasToken(balance.valueOf() > 0)
    }

    void start()
  }, [account])

  return { hasToken }
}

function shortAddress(address: string) {
  return address.slice(0, 5) + '...' + address.slice(-5)
}

export default function EthIdentity({ tokens }: { tokens: Token[] }) {
  const { hasToken } = useDosuInviteToken()
  const { account } = useMetaMask()
  const identity = Identities.eth
  if (!account) return null
  return (
    <CardBlock border title={identity}>
      <SecondarySubheaderText big>
        {shortAddress(account)}
      </SecondarySubheaderText>
      <IdentityBadges identity={identity} tokens={tokens} />
    </CardBlock>
  )
}
