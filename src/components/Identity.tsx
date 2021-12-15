import { BodyText, LargerText, SubheaderText } from 'components/Text'
import { FC, useEffect, useState } from 'react'
import { classnames } from 'classnames/tailwind'
import { useNavigate } from 'react-router-dom'
import Card from 'components/Card'
import ConnectedIdentity from 'models/ConnectedIdentity'
import FetchingData from 'components/FetchingData'
import IdentityType from 'models/IdentityType'
import PublicAccountStore from 'stores/PublicAccountStore'
import Token from 'models/Token'
import TokenType from 'models/TokenType'
import getPrivateTokens, { mintDosu } from 'helpers/api'
import identities from 'models/identities'
import useQuery from 'hooks/useQuery'
import { TokenList } from 'components/TokenList'

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

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setTokens(
          await getPrivateTokens(
            connectedIdentity.type,
            connectedIdentity.secret
          )
        )
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    void fetchTokens()
  }, [connectedIdentity])

  const mintToDosu = async () => {
    await mintDosu(
      connectedIdentity.type,
      TokenType.dosuHandle,
      connectedIdentity.secret
    )
  }

  return loading ? (
    <FetchingData />
  ) : (
    <div className={identitiesBlock}>
      <SubheaderText>NFT badges you have:</SubheaderText>
      <div className={badges}>
        {!!tokens?.minted.length &&
          TokenList({
            tokens: tokens?.minted,
            type: 'accent',
            action: mintToDosu,
          })}
        {!!tokens?.connected.length &&
          TokenList({ tokens: tokens?.connected, type: 'error' })}
        {!!tokens?.unminted.length &&
          TokenList({ tokens: tokens?.unminted, type: 'success' })}
        {!tokens?.minted.length &&
          !tokens?.unminted.length &&
          !tokens?.connected.length && (
            <SubheaderText>You do not have any NFT yet</SubheaderText>
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
      }
      navigate('/')
    }
    void verifyIdentity()
  }, [connectingIdentityType, accessToken, identity, identityType, navigate])

  return (
    <Card>
      <BodyText>{identity.name}</BodyText>
      {!connectedIdentity && <FetchingData />}
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
