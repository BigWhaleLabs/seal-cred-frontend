import { FC, useCallback } from 'react'
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
  const tokenSnap = tokens[connectedIdentity.secret]
  const fetchTokens = useCallback(() => {
    void TokensStore.updateToken(
      connectedIdentity.type,
      connectedIdentity.secret
    )
  }, [connectedIdentity])

  return (
    <div className={identitiesBlock}>
      <div className={badges}>
        {(!!tokenSnap?.minted.length || !!tokenSnap?.connected.length) && (
          <>
            <SubheaderText>NFT badges you have:</SubheaderText>
            {!!tokenSnap?.minted.length &&
              TokenList({
                tokens: tokenSnap.minted,
                type: 'minted',
                connectedIdentity,
                fetchTokens: fetchTokens,
              })}
            {!!tokenSnap?.connected.length &&
              TokenList({
                tokens: tokenSnap.connected,
                type: 'linked',
                connectedIdentity,
                fetchTokens: fetchTokens,
              })}
          </>
        )}
        {!!tokenSnap?.unminted.length && (
          <>
            <SubheaderText>NFT badges you can create:</SubheaderText>
            {TokenList({
              tokens: tokenSnap.unminted,
              type: 'unminted',
              connectedIdentity,
              fetchTokens: fetchTokens,
            })}
          </>
        )}
        {!tokenSnap?.minted.length &&
          !tokenSnap?.unminted.length &&
          !tokenSnap?.connected.length && (
            <SubheaderText>You cannot mint any NFT badges yet</SubheaderText>
          )}
      </div>
    </div>
  )
}
export default Tokens
