import { BodyText, LargerText, SubheaderText } from 'components/Text'
import { FC, useCallback, useEffect, useState } from 'react'
import { TokenList } from 'components/TokenList'
import { classnames } from 'classnames/tailwind'
import { useNavigate } from 'react-router-dom'
import Card from 'components/Card'
import ConnectedIdentity from 'models/ConnectedIdentity'
import FetchingData from 'components/FetchingData'
import IdentityType from 'models/IdentityType'
import PublicAccountStore from 'stores/PublicAccountStore'
import Token from 'models/Token'
import TokenType from 'models/TokenType'
import getPrivateTokens from 'helpers/api'
import identities from 'models/identities'
import useQuery from 'hooks/useQuery'

interface TokensProps {
  connectedIdentity: ConnectedIdentity
}

const badges = classnames('flex', 'flex-col')
const identitiesBlock = classnames('mt-6')

const Tokens: FC<TokensProps> = ({ connectedIdentity }) => {
  const [loading, setLoading] = useState(true)
  const [tokens, setTokens] = useState<{
    unminted: TokenType[]
    minted: Token[]
    connected: Token[]
  }>()
  const fetchTokens = useCallback(async () => {
    setLoading(true)
    try {
      setTokens(
        await getPrivateTokens(connectedIdentity.type, connectedIdentity.secret)
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [connectedIdentity])

  useEffect(() => {
    void fetchTokens()
  }, [connectedIdentity, fetchTokens])

  return loading ? (
    <FetchingData />
  ) : (
    <div className={identitiesBlock}>
      <div className={badges}>
        {(!!tokens?.minted.length || !!tokens?.connected.length) && (
          <>
            <SubheaderText>NFT badges you have:</SubheaderText>
            {!!tokens?.minted.length &&
              TokenList({
                tokens: tokens.minted,
                type: 'minted',
                connectedIdentity,
                fetchTokens,
              })}
            {!!tokens?.connected.length &&
              TokenList({
                tokens: tokens.connected,
                type: 'linked',
                connectedIdentity,
                fetchTokens,
              })}
          </>
        )}
        {!!tokens?.unminted.length && (
          <>
            <SubheaderText>NFT badges you can create:</SubheaderText>
            {TokenList({
              tokens: tokens.unminted,
              type: 'unminted',
              connectedIdentity,
              fetchTokens,
            })}
          </>
        )}
        {!tokens?.minted.length &&
          !tokens?.unminted.length &&
          !tokens?.connected.length && (
            <SubheaderText>You cannot mint any NFT badges yet</SubheaderText>
          )}
      </div>
    </div>
  )
}

interface IdentityProps {
  connectingIdentityType?: IdentityType
  connectedIdentity?: ConnectedIdentity
}
const breakWords = classnames('break-words')
const IdentityComponent: FC<IdentityProps> = ({
  connectedIdentity,
  connectingIdentityType,
}) => {
  const identityType = connectedIdentity?.type || connectingIdentityType
  const query = useQuery()
  const accessToken = query.get('access_token')
  const navigate = useNavigate()
  const [connectedError, setConnectedError] = useState(false)

  if (!identityType) {
    return null
  }

  const identity = identities[identityType]

  useEffect(() => {
    if (!connectingIdentityType || !accessToken) {
      return
    }
    const verifyIdentity = async () => {
      if (!identity.verify) {
        return
      }
      setConnectedError(false)
      try {
        const { identifier } = await identity.verify({ secret: accessToken })
        if (
          !PublicAccountStore.connectedIdentities.find(
            (identity) =>
              identity.type === connectingIdentityType &&
              identity.identifier === identifier
          )
        ) {
          PublicAccountStore.connectedIdentities.unshift({
            type: identityType,
            name: identity.name,
            identifier,
            secret: accessToken,
          })
          navigate('/')
        }
      } catch (error) {
        console.error('Verify error: ', error)
        setConnectedError(true)
      }
    }
    void verifyIdentity()
  }, [connectingIdentityType, accessToken, identity, identityType, navigate])

  return (
    <Card>
      <BodyText>{identity.name}</BodyText>
      {!connectedIdentity && <FetchingData error={connectedError} />}
      {connectedIdentity && (
        <div className={breakWords}>
          <LargerText>
            {identity.identifierTransformator?.(connectedIdentity.identifier) ||
              connectedIdentity.identifier}
          </LargerText>
        </div>
      )}
      {connectedIdentity && <Tokens connectedIdentity={connectedIdentity} />}
    </Card>
  )
}

export default IdentityComponent
