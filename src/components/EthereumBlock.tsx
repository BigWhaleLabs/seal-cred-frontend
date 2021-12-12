import { FC } from 'react'
import { SubSecondaryText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import EthField from 'components/EthField'
import PrivateKey from 'components/PrivateKey'

const ethereumBlock = classnames(
  'flex',
  'flex-col',
  'flex-wrap',
  'md:flex-row',
  'justify-center',
  'w-full',
  'space-y-4',
  'md:space-x-10',
  'md:space-y-0',
  'mt-6'
)
const publicEth = classnames('flex', 'flex-col', 'flex-1', 'w-full')
const privateKey = classnames('flex', 'flex-col', 'mx-auto', 'md:ml-10')

const EthereumBlock: FC<{ address?: string; owner?: boolean }> = ({
  owner,
  address,
}) => {
  return (
    <div className={ethereumBlock}>
      <div className={publicEth}>
        <SubSecondaryText>Public ETH address</SubSecondaryText>
        <div className={classnames('mt-4')}>
          <EthField address={address} />
        </div>
      </div>
      {owner && (
        <div className={privateKey}>
          <SubSecondaryText>Private key</SubSecondaryText>
          <div className={classnames('mt-4')}>
            <PrivateKey />
          </div>
        </div>
      )}
    </div>
  )
}

export default EthereumBlock
