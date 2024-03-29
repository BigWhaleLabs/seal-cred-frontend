import { BigNumber } from 'ethers'
import { SCERC721Derivative__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { proxy } from 'valtio'
import Network from 'models/Network'
import TokenOwnersStore from 'stores/TokenOwnersStore'
import getOwnerByTokenId from 'helpers/contracts/getOwnerByTokenId'
import networks from 'networks'

export default proxy({
  addressOwnerMap: {} as {
    [address: string]: {
      [tokenId: string]: Promise<string | undefined> | undefined
    }
  },
  fetchAddress(contract: string, tokenId: string) {
    const derivativeContract = SCERC721Derivative__factory.connect(
      contract,
      networks[Network.Goerli].defaultProvider
    )
    if (!TokenOwnersStore.addressOwnerMap[contract])
      TokenOwnersStore.addressOwnerMap[contract] = {}

    if (TokenOwnersStore.addressOwnerMap[contract][tokenId]) return

    TokenOwnersStore.addressOwnerMap[contract][tokenId] = getOwnerByTokenId(
      derivativeContract,
      BigNumber.from(tokenId)
    )
  },
})
