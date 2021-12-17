import { BadgeText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { linkToken, mintToken, unlinkToken } from 'helpers/api'
import Button from 'components/Button'
import ConnectedIdentity from 'models/ConnectedIdentity'
import Token from 'models/Token'
import TokenType from 'models/TokenType'
import titleForToken from 'helpers/titleForToken'

type ButtonType = 'minted' | 'unminted' | 'linked'

export enum TokenActionType {
  minted = 'link',
  unminted = 'create',
  linked = 'unlink',
}
export interface TokenListProps {
  connectedIdentity: ConnectedIdentity
  tokens: (Token | TokenType)[]
  type: ButtonType
}

const listWrapper = classnames('flex', 'justify-start', 'items-center', 'py-2')
const listTokenTitle = classnames('w-full', 'text-white')
const listTokenAction = classnames('justify-self-end')

const onClickHandler = (
  type: string,
  connectedIdentity: ConnectedIdentity,
  publicOwnerAddress?: string
) => {
  switch (type) {
    case 'minted':
      if (!publicOwnerAddress) {
        throw new Error('Public owner address not provided')
      }
      return linkToken(
        connectedIdentity.type,
        TokenType.dosuHandle,
        connectedIdentity.secret,
        publicOwnerAddress
      )
    case 'unminted':
      return mintToken(
        connectedIdentity.type,
        TokenType.dosuHandle,
        connectedIdentity.secret
      )
    case 'connected':
      return unlinkToken(
        connectedIdentity.type,
        TokenType.dosuHandle,
        connectedIdentity.secret
      )
  }
}

function colorForType(type: ButtonType) {
  switch (type) {
    case 'minted':
      return 'accent'
    case 'unminted':
      return 'success'
    case 'linked':
      return 'error'
  }
}

export const TokenList = ({
  tokens,
  type,
  connectedIdentity,
}: TokenListProps) => {
  return tokens.map((token: Token | TokenType, index: number) => (
    <div className={listWrapper} key={index}>
      <div className={listTokenTitle}>
        <BadgeText>{titleForToken(token, connectedIdentity)}</BadgeText>
      </div>
      <div className={listTokenAction}>
        <Button
          color={colorForType(type)}
          badge
          onClick={() =>
            onClickHandler(
              type,
              connectedIdentity,
              typeof token === 'string' ? undefined : token.publicOwnerAddress
            )
          }
        >
          {TokenActionType[type]}
        </Button>
      </div>
    </div>
  ))
}

export default TokenList
