import { proxy } from 'valtio'
import IdentityType from 'models/IdentityType'
import Token from 'models/Token'
import TokenType from 'models/TokenType'
import getPrivateTokens from 'helpers/api'

export interface TokensProp {
  readonly unminted: readonly TokenType[]
  readonly minted: readonly Token[]
  readonly connected: readonly Token[]
}

type TokensType = { [index: string]: Promise<TokensProp> }

const TokensStore = proxy({
  tokens: {} as TokensType,
  updateToken: (type: IdentityType, secret: string) => {
    TokensStore.tokens[secret] = getPrivateTokens(type, secret)
  },
})

export default TokensStore
