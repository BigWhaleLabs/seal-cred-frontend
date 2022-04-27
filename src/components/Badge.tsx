import { BadgeText } from 'components/Text'
import { FC, useEffect, useState } from 'react'
import { SCERC721Derivative } from '@big-whale-labs/street-cred-ledger-contract'
import {
  alignItems,
  borderColor,
  borderRadius,
  borderWidth,
  classnames,
  display,
  justifyContent,
  padding,
} from 'classnames/tailwind'
import BadgeType from 'models/Badge'

const badge = classnames(
  display('flex'),
  borderWidth('border'),
  borderColor('border-primary-dimmed'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  padding('py-1', 'px-2'),
  borderRadius('rounded')
)

type BadgeProps = {
  contractAddress: string
  tokenName: SCERC721Derivative['name']
  tokenSymbol: SCERC721Derivative['symbol']
}

const Badge: FC<BadgeProps> = ({ tokenName, tokenSymbol, contractAddress }) => {
  const [token, setToken] = useState<string | undefined>(undefined)

  useEffect(() => {
    async function fetchToken() {
      try {
        const symbol = await tokenSymbol()
        const contractName = await tokenName()
        if (!symbol || !BadgeType[symbol]) {
          setToken(
            contractName.length ? contractName : `Contract: ${contractAddress}`
          )
        } else {
          setToken(BadgeType[symbol] || contractName)
        }
      } catch (error) {
        console.error(error)
      }
    }

    void fetchToken()
  }, [tokenName, tokenSymbol, contractAddress])

  return (
    <>
      {token && (
        <div className={badge}>
          <BadgeText>{token}</BadgeText>
        </div>
      )}
    </>
  )
}

export default Badge
