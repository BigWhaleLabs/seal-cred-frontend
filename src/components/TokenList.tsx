import { BadgeText } from 'components/Text'
import { FC, useState } from 'react'
import {
  alignItems,
  classnames,
  display,
  justifyContent,
  justifySelf,
  padding,
  textColor,
  width,
} from 'classnames/tailwind'
import { linkToken, mintToken, unlinkToken } from 'helpers/api'
import BadgesStore from 'stores/BadgesStore'
import Button from 'components/Button'
import ConnectedIdentity from 'models/ConnectedIdentity'
import PublicAccountStore from 'stores/PublicAccountStore'
import Token from 'models/Token'
import TokenType from 'models/TokenType'
import titleForToken from 'helpers/titleForToken'

type ButtonType = 'minted' | 'unminted' | 'linked'

enum TokenActionType {
  minted = 'link',
  unminted = 'create',
  linked = 'unlink',
}
interface TokenListProps {
  connectedIdentity: ConnectedIdentity
  tokens: readonly (Token | TokenType)[]
  type: ButtonType
  fetchTokens: () => void
}

const listWrapper = classnames(
  display('flex'),
  justifyContent('justify-start'),
  alignItems('items-center'),
  padding('py-2')
)
const listTokenTitle = classnames(width('w-full'), textColor('text-white'))
const listTokenAction = classnames(justifySelf('justify-self-end'))

const onClickHandler = (
  type: string,
  connectedIdentity: ConnectedIdentity,
  publicOwnerAddress?: string
) => {
  const tokenType =
    connectedIdentity.type === 'eth'
      ? TokenType.dosu1wave
      : TokenType.dosuHandle
  switch (type) {
    case 'unminted':
      return mintToken(
        connectedIdentity.type,
        tokenType,
        connectedIdentity.secret
      )
    case 'minted':
      if (!publicOwnerAddress) {
        throw new Error('Public owner address not provided')
      }
      return linkToken(
        connectedIdentity.type,
        tokenType,
        connectedIdentity.secret,
        publicOwnerAddress
      )
    case 'linked':
      return unlinkToken(
        connectedIdentity.type,
        tokenType,
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

const TokenComponent: FC<TokenListProps & { token: Token | TokenType }> = ({
  token,
  type,
  connectedIdentity,
  fetchTokens,
}) => {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <div className={listTokenTitle}>
        <BadgeText>{titleForToken(token, connectedIdentity)}</BadgeText>
      </div>
      <div className={listTokenAction}>
        <Button
          loading={loading}
          color={colorForType(type)}
          badge
          onClick={async () => {
            setLoading(true)
            try {
              await onClickHandler(
                type,
                connectedIdentity,
                PublicAccountStore.mainEthWallet.address
              )
            } catch (error) {
              console.error(error)
            } finally {
              setLoading(false)
            }
            await fetchTokens()
            await BadgesStore.fetchPublicBadges()
          }}
        >
          {TokenActionType[type]}
        </Button>
      </div>
    </>
  )
}

export const TokenList: FC<TokenListProps> = ({ tokens, ...rest }) => {
  return (
    <>
      {tokens.map((token: Token | TokenType, index: number) => (
        <div className={listWrapper} key={index}>
          <TokenComponent tokens={tokens} {...rest} token={token} />
        </div>
      ))}
    </>
  )
}

export default TokenList
