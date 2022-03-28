import { proxy } from 'valtio'
import IdentityType from 'models/IdentityType'
import Token from 'models/Token'
import TokenType from 'models/TokenType'
import getPrivateTokens from 'helpers/api'

export interface Tokens {
  unminted: TokenType[]
  minted: Token[]
  connected: Token[]
}

interface TokensState {
  tokens: { [index: string]: Promise<Tokens> }
  updateToken: (type: IdentityType, secret: string) => void
}

const TokensStore = proxy<TokensState>({
  tokens: {},
  updateToken: (type: IdentityType, secret: string) => {
    TokensStore.tokens[secret] = getPrivateTokens(type, secret)
  },
})

export default TokensStore
