import { BadgeText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { linkToken, mintToken, unlinkToken } from 'helpers/api'
import ConnectedIdentity from 'models/ConnectedIdentity'
import Token from 'models/Token'
import TokenButton from 'components/TokenButton'
import TokenType from 'models/TokenType'

export enum TokenActionType {
  minted = 'link',
  unminted = 'create',
  connected = 'unlink',
}
export interface TokenListProps {
  connectedIdentity: ConnectedIdentity
  tokens: (Token | TokenType)[]
  type: 'minted' | 'unminted' | 'connected'
  action?: () => Promise<void>
}

const listWrapper = classnames('flex', 'justify-start', 'items-center', 'py-2')
const listTokenTitle = classnames('w-full', 'text-white')
const listTokenAction = classnames('justify-self-end')

const defaultFunction = async (
  type: string,
  connectedIdentity: ConnectedIdentity,
  publicOwnerAddress?: string
) => {
  switch (type) {
    case 'minted':
      await linkToken(
        connectedIdentity.type,
        TokenType.dosuHandle,
        connectedIdentity.secret,
        publicOwnerAddress || ''
      )
      break
    case 'unminted':
    case 'connected':
      type === 'unminted'
        ? await mintToken(
            connectedIdentity.type,
            TokenType.dosuHandle,
            connectedIdentity.secret
          )
        : await unlinkToken(
            connectedIdentity.type,
            TokenType.dosuHandle,
            connectedIdentity.secret
          )
  }
}

export const TokenList = ({
  tokens,
  type,
  action,
  connectedIdentity,
}: TokenListProps) => {
  return tokens.map((token: Token | TokenType, index: number) => (
    <div className={listWrapper} key={index}>
      <div className={listTokenTitle}>
        <BadgeText>{typeof token === 'string' ? token : token.type}</BadgeText>
      </div>
      <div className={listTokenAction}>
        <TokenButton
          type={type}
          onClick={() => {
            action ||
              defaultFunction(
                type,
                connectedIdentity,
                typeof token !== 'string' ? token.publicOwnerAddress : ''
              )
          }}
        >
          {TokenActionType[type]}
        </TokenButton>
      </div>
    </div>
  ))
}

export default TokenList
