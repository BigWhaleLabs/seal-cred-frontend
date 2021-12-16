import { BadgeText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { mintToken, linkToken, unlinkToken } from 'helpers/api'
import Button from 'components/Button'
import ConnectedIdentity from 'models/ConnectedIdentity'
import Token from 'models/Token'
import TokenType from 'models/TokenType'

export enum TokenActionType {
  mint = 'accent',
  unlink = 'error',
  link = 'success',
}
export interface TokenListProps {
  connectedIdentity: ConnectedIdentity
  tokens: (Token | TokenType)[]
  type: 'mint' | 'unlink' | 'link'
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
    case 'link':
      await linkToken(
        connectedIdentity.type,
        TokenType.dosuHandle,
        connectedIdentity.secret,
        publicOwnerAddress || ''
      )
      break
    case 'mint':
    case 'unlink':
      type === 'mint'
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
        <Button
          type={TokenActionType[type]}
          badge
          onClick={() => {
            action ||
              defaultFunction(
                type,
                connectedIdentity,
                typeof token !== 'string' ? token.publicOwnerAddress : ''
              )
          }}
        >
          {type}
        </Button>
      </div>
    </div>
  ))
}

export default TokenList
