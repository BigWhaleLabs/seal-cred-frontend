import { FC } from 'react'
import { SubheaderText } from 'components/Text'
import { TokenList } from 'components/TokenList'
import { classnames, display, flexDirection, margin } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import ConnectedIdentity from 'models/ConnectedIdentity'
import TokensStore from 'stores/TokensStore'

interface TokensProps {
  connectedIdentity: ConnectedIdentity
}

const badges = classnames(display('flex'), flexDirection('flex-col'))
const identitiesBlock = classnames(margin('mt-6'))

const Tokens: FC<TokensProps> = ({ connectedIdentity }) => {
  const { tokens } = useSnapshot(TokensStore)
  const secret = connectedIdentity.secret
  const fetchTokens = () => {
    TokensStore.updateToken(connectedIdentity.type, connectedIdentity.secret)
  }

  return (
    <div className={identitiesBlock}>
      <div className={badges}>
        {(!!tokens[secret]?.minted.length ||
          !!tokens[secret]?.connected.length) && (
          <>
            <SubheaderText>NFT badges you have:</SubheaderText>
            {!!tokens[secret]?.minted.length &&
              TokenList({
                tokens: tokens[secret].minted,
                type: 'minted',
                connectedIdentity,
                fetchTokens: fetchTokens,
              })}
            {!!tokens[secret]?.connected.length &&
              TokenList({
                tokens: tokens[secret].connected,
                type: 'linked',
                connectedIdentity,
                fetchTokens: fetchTokens,
              })}
          </>
        )}
        {!!tokens[secret]?.unminted.length && (
          <>
            <SubheaderText>NFT badges you can create:</SubheaderText>
            {TokenList({
              tokens: tokens[secret].unminted,
              type: 'unminted',
              connectedIdentity,
              fetchTokens: fetchTokens,
            })}
          </>
        )}
        {!tokens[secret]?.minted.length &&
          !tokens[secret]?.unminted.length &&
          !tokens[secret]?.connected.length && (
            <SubheaderText>You cannot mint any NFT badges yet</SubheaderText>
          )}
      </div>
    </div>
  )
}
export default Tokens
